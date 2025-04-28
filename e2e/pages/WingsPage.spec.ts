import { test, expect } from "@playwright/test";

test.describe("Wings Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/wings");
  });

  test("displays the 'Choose Your Fate' heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Choose Your Fate/i })
    ).toBeVisible();
  });
});
