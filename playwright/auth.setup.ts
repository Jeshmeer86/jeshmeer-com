// playwright/auth.setup.ts
import { test as setup, expect } from "@playwright/test";

const CLERK_EMAIL = process.env.PLAYWRIGHT_CLERK_EMAIL;
const CLERK_PASSWORD = process.env.PLAYWRIGHT_CLERK_PASSWORD;

setup("Authenticate and save storageState", async ({ page }) => {
  if (!CLERK_EMAIL || !CLERK_PASSWORD) {
    throw new Error(
      "Set PLAYWRIGHT_CLERK_EMAIL and PLAYWRIGHT_CLERK_PASSWORD in your environment",
    );
  }
  await page.goto("http://localhost:3000/sign-in");
  // Wait for Clerk sign-in form
  await expect(page.locator('input[type="email"]')).toBeVisible();
  await page.fill('input[type="email"]', CLERK_EMAIL);
  await page.click('button:has-text("Continue")');
  await expect(page.locator('input[type="password"]')).toBeVisible();
  await page.fill('input[type="password"]', CLERK_PASSWORD);
  await page.click('button:has-text("Continue")');
  // Wait for dashboard redirect or some authenticated element
  await page.waitForURL("**/dashboard/**", { timeout: 20000 });
  // Save storage state for reuse
  await page.context().storageState({ path: "playwright/.auth/state.json" });
});
