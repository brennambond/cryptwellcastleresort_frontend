import { test, expect } from "@playwright/test";

test.describe("Wing Detail Page", () => {
  const wingId = "5ea27048-1944-4e1d-8487-d5d872ab14a6";

  test("renders Bloodborn Wing content correctly", async ({ page }) => {
    await page.goto(`/wings/${wingId}`);

    await expect(
      page.getByRole("heading", {
        name: /Welcome to the Realm of the Bloodborn/i,
      })
    ).toBeVisible();

    await expect(page.getByAltText(/Bloodborn/i)).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: /Bloodborn Wing Services and Facilities Available/i,
      })
    ).toBeVisible();
  });
});
