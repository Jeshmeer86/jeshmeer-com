// playwright/auth.fixture.ts
import { test as base } from "@playwright/test";

export const test = base.extend({
  storageState: "playwright/.auth/state.json",
});
export { expect } from "@playwright/test";
