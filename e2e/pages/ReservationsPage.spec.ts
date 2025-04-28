// e2e/pages/ReservationsPage.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Reservations Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/reservations");
  });

  test("displays the My Reservations heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /My Reservations/i })
    ).toBeVisible();
  });
});
