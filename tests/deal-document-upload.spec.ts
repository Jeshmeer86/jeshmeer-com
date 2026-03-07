import { test, expect } from "./auth.fixture";

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000";
const CLERK_ORG_ID = process.env.PLAYWRIGHT_CLERK_ORG_ID;
const CLERK_ORG_NAME =
  process.env.PLAYWRIGHT_CLERK_ORG_NAME || "Playwright Test Org";

if (!CLERK_ORG_ID) {
  throw new Error("Set PLAYWRIGHT_CLERK_ORG_ID in your environment");
}

test.describe("Deal Document Upload", () => {
  test("User can upload document with type selection", async ({
    page,
    request,
  }) => {
    await request.post(`${BASE_URL}/api/test/create-org`, {
      data: { orgId: CLERK_ORG_ID, name: CLERK_ORG_NAME },
    });

    const dealNumber = "PW-DOC-" + Date.now();
    let dealId: string | null = null;

    try {
      // Create deal
      const createResponse = await request.post(
        `${BASE_URL}/api/test/create-deal`,
        {
          data: { orgId: CLERK_ORG_ID, dealNumber },
        },
      );
      expect(createResponse.ok()).toBeTruthy();
      const createPayload = (await createResponse.json()) as { dealId: string };
      dealId = createPayload.dealId;

      await page.goto(`${BASE_URL}/dashboard/deals/${dealId}`);
      await expect(
        page.getByRole("heading", { name: new RegExp(dealNumber) }),
      ).toBeVisible();

      // Upload a document with type selection
      const filePath = require("path").resolve(
        __dirname,
        "./fixtures/sample.pdf",
      );
      await page.getByLabel("Document type").selectOption("ID_DOCUMENT");
      const fileInput = page.getByLabel("File");
      await fileInput.setInputFiles(filePath);
      await page.getByRole("button", { name: "Upload" }).click();
      await expect(page.getByText("Document uploaded")).toBeVisible();

      // Check document appears in list with correct type
      await expect(page.getByText("ID document")).toBeVisible();
      await expect(page.getByText("sample.pdf")).toBeVisible();

      // Upload another document with default type (OTHER)
      const filePath2 = require("path").resolve(
        __dirname,
        "./fixtures/sample2.pdf",
      );
      // Reset file input
      await page.getByLabel("File").setInputFiles(filePath2);
      await page.getByRole("button", { name: "Upload" }).click();
      await expect(page.getByText("Document uploaded")).toBeVisible();
      await expect(page.getByText("Other")).toBeVisible();
      await expect(page.getByText("sample2.pdf")).toBeVisible();
    } finally {
      if (dealId) {
        await request.delete(`${BASE_URL}/api/test/delete-deal`, {
          data: { dealId },
        });
      }
    }
  });
});
