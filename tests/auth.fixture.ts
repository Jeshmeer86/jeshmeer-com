import { test as base, expect } from "@playwright/test";

export const test = base.extend({
  storageState: "playwright/.auth/state.json",
});
export { expect };
