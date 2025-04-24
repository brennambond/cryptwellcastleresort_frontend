// e2e/homepage.spec.ts
import { test, expect } from "@playwright/test";

test("homepage has Cryptwell Castle Resort title", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page).toHaveTitle(/Cryptwell Castle Resort/);
});
