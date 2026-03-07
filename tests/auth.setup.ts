import { test as setup, expect } from "@playwright/test";

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000";
const CLERK_EMAIL = process.env.PLAYWRIGHT_CLERK_EMAIL;
const CLERK_PASSWORD = process.env.PLAYWRIGHT_CLERK_PASSWORD;

setup("Authenticate and save storageState", async ({ page }) => {
  if (!CLERK_EMAIL || !CLERK_PASSWORD) {
    throw new Error(
      "Set PLAYWRIGHT_CLERK_EMAIL and PLAYWRIGHT_CLERK_PASSWORD in your environment",
    );
  }
  await page.goto(`${BASE_URL}/sign-in`);
  await expect(page.getByPlaceholder("Enter your email")).toBeVisible({
    timeout: 10000,
  });
  await page.getByPlaceholder("Enter your email").fill(CLERK_EMAIL);
  await page.getByRole("button", { name: "Continue" }).first().click();
  await expect(page.getByPlaceholder("Enter your password")).toBeVisible({
    timeout: 10000,
  });
  await page.getByPlaceholder("Enter your password").fill(CLERK_PASSWORD);
  await page.getByRole("button", { name: "Continue" }).first().click();
  // Wait for dashboard or authenticated element
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible({
    timeout: 20000,
  });
  await page.context().storageState({ path: "playwright/.auth/state.json" });
});
