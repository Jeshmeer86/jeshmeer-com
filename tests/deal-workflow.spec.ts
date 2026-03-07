import { test, expect } from "./auth.fixture";
import type { APIRequestContext } from "@playwright/test";

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000";
const CLERK_ORG_ID = process.env.PLAYWRIGHT_CLERK_ORG_ID;
const CLERK_ORG_NAME =
  process.env.PLAYWRIGHT_CLERK_ORG_NAME || "Playwright Test Org";

if (!CLERK_ORG_ID) {
  throw new Error("Set PLAYWRIGHT_CLERK_ORG_ID in your environment");
}

type CreateDealResponse = {
  dealId: string;
};

async function ensureOrg(request: APIRequestContext) {
  await request.post(`${BASE_URL}/api/test/create-org`, {
    data: { orgId: CLERK_ORG_ID, name: CLERK_ORG_NAME },
  });
}

async function createTestDeal(request: APIRequestContext, dealNumber: string) {
  const createResponse = await request.post(
    `${BASE_URL}/api/test/create-deal`,
    {
      data: { orgId: CLERK_ORG_ID, dealNumber },
    },
  );

  expect(createResponse.ok()).toBeTruthy();

  const payload = (await createResponse.json()) as CreateDealResponse;
  return payload.dealId;
}

test.describe("Deal Workflow", () => {
  test("Create deal: form persists and redirects to detail", async ({
    page,
    request,
  }) => {
    await ensureOrg(request);

    const dealNumber = `PW-${Date.now()}`;
    let dealId: string | null = null;

    try {
      await page.goto(`${BASE_URL}/dashboard/deals`);
      await expect(page.getByRole("heading", { name: "Deals" })).toBeVisible();

      await page.getByLabel("Deal number").fill(dealNumber);
      await page.getByRole("button", { name: "Create deal" }).click();

      await expect(page).toHaveURL(/\/dashboard\/deals\/[A-Za-z0-9_-]+$/);

      const url = new URL(page.url());
      dealId = url.pathname.split("/").pop() ?? null;

      await expect(
        page.getByRole("heading", { name: `Deal: ${dealNumber}` }),
      ).toBeVisible();

      await expect(page.getByText("DEAL_CREATED")).toBeVisible();
    } finally {
      if (dealId) {
        await request.delete(`${BASE_URL}/api/test/delete-deal`, {
          data: { dealId },
        });
      }
    }
  });

  test("Deposit approval: mark deposit approved and log event", async ({
    page,
    request,
  }) => {
    await ensureOrg(request);

    const dealNumber = `PW-APPROVAL-${Date.now()}`;
    let dealId: string | null = null;

    try {
      dealId = await createTestDeal(request, dealNumber);

      await page.goto(`${BASE_URL}/dashboard/deals/${dealId}`);

      await page
        .getByRole("button", { name: /Mark deposit approved/i })
        .click();

      await expect(page.getByText("DEPOSIT_APPROVED")).toBeVisible();
      await expect(page.getByText(/Deposit approved/i)).toBeVisible();
    } finally {
      if (dealId) {
        await request.delete(`${BASE_URL}/api/test/delete-deal`, {
          data: { dealId },
        });
      }
    }
  });

  test("Deal status workflow: update and verify status changes", async ({
    page,
    request,
  }) => {
    await ensureOrg(request);

    const dealNumber = `PW-STATUS-${Date.now()}`;
    let dealId: string | null = null;

    try {
      dealId = await createTestDeal(request, dealNumber);

      await page.goto(`${BASE_URL}/dashboard/deals/${dealId}`);

      const currentStatus = page.getByTestId("deal-current-status");
      await expect(currentStatus).toHaveText("New");

      const statusSelect = page.getByLabel("Deal status");
      const statusButton = page.getByRole("button", { name: "Update status" });

      await expect(statusSelect).toHaveValue("NEW");

      for (const [value, label] of [
        ["RESERVED", "Reserved"],
        ["DEPOSIT_RECEIVED", "Deposit Received"],
        ["IN_FINANCE", "In Finance"],
        ["COMPLETED", "Completed"],
        ["CANCELLED", "Cancelled"],
      ] as const) {
        await statusSelect.selectOption(value);
        await statusButton.click();

        await expect(currentStatus).toHaveText(label);
        await expect(
          page.getByText(`Status changed to ${label}`),
        ).toBeVisible();
        await expect(page.getByText("STATUS_CHANGED")).toBeVisible();
      }

      await expect(page.getByText("New -> Reserved")).toBeVisible();
      await expect(page.getByText("Completed -> Cancelled")).toBeVisible();
    } finally {
      if (dealId) {
        await request.delete(`${BASE_URL}/api/test/delete-deal`, {
          data: { dealId },
        });
      }
    }
  });
});

test.describe("Deal Export JSON", () => {
  test("Org user can export deal as JSON with required fields", async ({
    request,
  }) => {
    await ensureOrg(request);

    const dealNumber = `PW-EXPORT-${Date.now()}`;
    let dealId: string | null = null;

    try {
      dealId = await createTestDeal(request, dealNumber);

      await request.post(`${BASE_URL}/api/deals/${dealId}/events`, {
        data: { message: "Export test note" },
      });

      const exportResponse = await request.get(
        `${BASE_URL}/api/deals/${dealId}/export`,
      );

      expect(exportResponse.ok()).toBeTruthy();

      const data = (await exportResponse.json()) as {
        deal: { dealNumber: string };
        notes: Array<{ message: string }>;
        documents: Array<unknown>;
        timeline: Array<{ type: string }>;
      };

      expect(data).toHaveProperty("deal");
      expect(data.deal.dealNumber).toBe(dealNumber);

      expect(Array.isArray(data.notes)).toBe(true);
      expect(Array.isArray(data.documents)).toBe(true);
      expect(Array.isArray(data.timeline)).toBe(true);

      expect(data.notes.some((n) => n.message === "Export test note")).toBe(
        true,
      );

      expect(data.timeline.some((e) => e.type === "EXPORT_JSON")).toBe(true);
    } finally {
      if (dealId) {
        await request.delete(`${BASE_URL}/api/test/delete-deal`, {
          data: { dealId },
        });
      }
    }
  });
});
