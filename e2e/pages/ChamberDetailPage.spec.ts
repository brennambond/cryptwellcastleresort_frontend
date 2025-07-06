import { test, expect } from "@playwright/test";

test("Chamber Detail Page renders correctly", async ({ page }) => {
  await page.route(
    "**/api/rooms/rooms/cac95be0-68a6-46d9-87f3-56a3e934b74c/",
    (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: "cac95be0-68a6-46d9-87f3-56a3e934b74c",
          title: "Reborn Single Bedroom - 2 Beds",
          description: "Mocked chamber for test",
          price_per_night: 150,
          wing: "wing-id",
          category: "category-id",
          image_url: "https://example.com/fake-room.png",
          beds: 2,
          bedrooms: 1,
          bathrooms: 1,
          guests: 4,
          created_at: "2025-01-01T00:00:00Z",
        }),
      });
    }
  );

  await page.goto("/chambers/cac95be0-68a6-46d9-87f3-56a3e934b74c");

  await expect(
    page.getByRole("heading", { name: /Reborn Single Bedroom - 2 Beds/i })
  ).toBeVisible({ timeout: 5000 });

  await expect(
    page.getByAltText(/Reborn Single Bedroom - 2 Beds/i)
  ).toBeVisible({ timeout: 5000 });
});
