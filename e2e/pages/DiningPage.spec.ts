import { test, expect } from "@playwright/test";

test.describe("Dining Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/dining");
  });

  test("displays the Welcome heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Welcome to The Veiled Board/i })
    ).toBeVisible();
  });

  test("displays the restaurant image", async ({ page }) => {
    await expect(page.getByAltText(/The Veiled Board/i)).toBeVisible();
  });
});
