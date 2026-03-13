import { test, expect } from "@playwright/test";

test.describe("Sovereign Deal Control Demo Page", () => {
  test("Landing page renders all sections and CTAs", async ({ page }) => {
    await page.goto("/demo/deal-control");
    await expect(
      page.getByRole("heading", { name: /controlled deal workflows/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /view live demo/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /request private walkthrough/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /dealership pain points/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: /how sovereign deal control solves it/i,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /business outcomes/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /preview the live deal dashboard/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: /ready to see sovereign deal control in action/i,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /request a walkthrough/i }),
    ).toBeVisible();
  });

  test("Demo preview links to dashboard", async ({ page }) => {
    await page.goto("/demo/deal-control");
    const previewLink = page.getByRole("link", {
      name: /live dashboard preview coming soon/i,
    });
    await expect(previewLink).toHaveAttribute("href", "/dashboard/deals");
  });
});
