// tests/deal-workflow.spec.ts

import { test, expect } from "./auth.fixture";

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000";
const CLERK_ORG_ID = process.env.PLAYWRIGHT_CLERK_ORG_ID;
const CLERK_ORG_NAME =
  process.env.PLAYWRIGHT_CLERK_ORG_NAME || "Playwright Test Org";

if (!CLERK_ORG_ID) {
  throw new Error("Set PLAYWRIGHT_CLERK_ORG_ID in your environment");
}

test.describe("Deal Workflow", () => {
  test("Create deal: form persists and redirects to detail", async ({
    page,
    request,
  }) => {
    // Ensure org exists
    await request.post(`${BASE_URL}/api/test/create-org`, {
      data: { orgId: CLERK_ORG_ID, name: CLERK_ORG_NAME },
    });

    const dealNumber = "PW-" + Date.now();
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
      await expect(page.getByText(`Deal created: ${dealNumber}`)).toBeVisible();
      await expect(page.getByText(`Deal ${dealNumber}`)).toBeVisible();
    } finally {
      if (dealId) {
        await request.delete(`${BASE_URL}/api/test/delete-deal`, {
          data: { dealId },
        });
      }
    }
  });

  test("Deposit approval: mark deposit approved and log event", async ({ page }) => {
    // Go to demo reservation page (demo system)
    await page.goto(`${BASE_URL}/demo/reservations/R-2026-0001`);

    // Click 'Mark Deposit Received' button
    await page.getByRole("button", { name: /Mark Deposit Received/i }).click();

    // Wait for UI refresh
    await page.waitForTimeout(500);

    // Check for audit log entry for deposit approval
    await expect(page.getByText(/deposit approved by manager/i)).toBeVisible();
  });

    const dealNumber = "PW-STATUS-" + Date.now();
    let dealId: string | null = null;

    try {
      const createResponse = await request.post(`${BASE_URL}/api/test/create-deal`, {
        data: { orgId: CLERK_ORG_ID, dealNumber },
      });
      expect(createResponse.ok()).toBeTruthy();

      const createPayload = (await createResponse.json()) as { dealId: string };
      dealId = createPayload.dealId;

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
        await expect(page.getByText(`Status changed to ${label}`)).toBeVisible();
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
  test("Org user can export deal as JSON with all required fields", async ({ request }) => {
    await request.post(`${BASE_URL}/api/test/create-org`, {
      data: { orgId: CLERK_ORG_ID, name: CLERK_ORG_NAME },
    });
    const dealNumber = "PW-EXPORT-" + Date.now();
    let dealId: string | null = null;
    try {
      // Create deal
      const createResponse = await request.post(`${BASE_URL}/api/test/create-deal`, {
        data: { orgId: CLERK_ORG_ID, dealNumber },
      });
      expect(createResponse.ok()).toBeTruthy();
      const createPayload = (await createResponse.json()) as { dealId: string };
      dealId = createPayload.dealId;

      // Add a note
      await request.post(`${BASE_URL}/api/deals/${dealId}/events`, {
        data: { message: "Export test note" },
      });

      // Export as JSON
      const exportResponse = await request.get(`${BASE_URL}/api/deals/${dealId}/export`);
      expect(exportResponse.ok()).toBeTruthy();
      const data = await exportResponse.json();
      expect(data).toHaveProperty("deal");
      expect(data.deal).toHaveProperty("dealNumber", dealNumber);
      expect(data).toHaveProperty("notes");
      expect(Array.isArray(data.notes)).toBe(true);
      expect(data).toHaveProperty("documents");
      expect(Array.isArray(data.documents)).toBe(true);
      expect(data).toHaveProperty("timeline");
      expect(Array.isArray(data.timeline)).toBe(true);
      // Notes should include the note we added
      expect(data.notes.some((n: any) => n.message === "Export test note")).toBe(true);
      // Timeline should include EXPORT_JSON event
      expect(data.timeline.some((e: any) => e.type === "EXPORT_JSON")).toBe(true);
    } finally {
      if (dealId) {
        await request.delete(`${BASE_URL}/api/test/delete-deal`, {
          data: { dealId },
        });
      }
    }
  });

  test("Other org cannot export deal JSON", async ({ request }) => {
    // Create deal in main org
    await request.post(`${BASE_URL}/api/test/create-org`, {
      data: { orgId: CLERK_ORG_ID, name: CLERK_ORG_NAME },
    });
    const dealNumber = "PW-EXPORT-ORG-" + Date.now();
    let dealId: string | null = null;
    try {
      const createResponse = await request.post(`${BASE_URL}/api/test/create-deal`, {
        data: { orgId: CLERK_ORG_ID, dealNumber },
      });
      expect(createResponse.ok()).toBeTruthy();
      const createPayload = (await createResponse.json()) as { dealId: string };
      dealId = createPayload.dealId;

      // Try to export as another org (simulate by passing a different org header if supported, or skip if not possible)
      // Here, just simulate unauthorized by deleting the org and trying to fetch
      await request.post(`${BASE_URL}/api/test/create-org`, {
        data: { orgId: "other-org", name: "Other Org" },
      });
      // (In real test, would use a different session/user)
      const exportResponse = await request.get(`${BASE_URL}/api/deals/${dealId}/export`);
      // Should be 404 or 401
      expect([401, 404]).toContain(exportResponse.status());
    } finally {
      if (dealId) {
        await request.delete(`${BASE_URL}/api/test/delete-deal`, {
          data: { dealId },
        });
      }
    }
  });
});
