import { test, expect } from "@playwright/test";

test.describe("Chambers Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/chambers");
  });

  test("displays the Guest Chambers heading", async ({ page }) => {
    const heading = page.getByRole("heading", { name: /Guest Chambers/i });
    await expect(heading).toBeVisible();
  });

  test("displays the room description paragraph", async ({ page }) => {
    await expect(
      page.getByText(/Each Wing of our resort comprises 30 guest chambers/i)
    ).toBeVisible();
  });

  test("displays the Search Filters button", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: /Search Now:/i })
    ).toBeVisible();
  });

  test("displays the Chambers List section", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Guest Chambers/i })
    ).toBeVisible();
  });

  test("displays the Chamber Services section", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Services/i })
    ).toBeVisible();
  });
});
