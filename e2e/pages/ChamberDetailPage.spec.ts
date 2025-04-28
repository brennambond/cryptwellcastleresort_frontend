import { test, expect } from "@playwright/test";

test.describe("Chamber Detail Page", () => {
  const chamberId = "cac95be0-68a6-46d9-87f3-56a3e934b74c";

  test("renders Chamber Detail content correctly", async ({ page }) => {
    await page.goto(`/chambers/${chamberId}`);

    await expect(
      page.getByRole("heading", { name: /Reborn Single Bedroom - 2 Beds/i })
    ).toBeVisible();

    await expect(
      page.getByAltText(/Reborn Single Bedroom - 2 Beds/i)
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { name: /Book Your Stay/i })
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: /Chamber Services and Facilities Available/i,
      })
    ).toBeVisible();
  });
});
