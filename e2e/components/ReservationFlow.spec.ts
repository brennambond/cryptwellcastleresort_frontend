import { test, expect } from "@playwright/test";

test("User can make and delete a reservation successfully", async ({
  page,
  request,
}) => {
  const loginResponse = await request.post(
    "https://hauntedhotel-backend-api.com/api/auth/login/",
    {
      data: {
        email: "testuser@example.com",
        password: "password123",
      },
    }
  );

  expect(loginResponse.ok()).toBeTruthy();

  const loginData = await loginResponse.json();
  const accessToken = loginData.access;

  await page.addInitScript(
    ({ token }) => {
      localStorage.setItem("accessToken", token);
      localStorage.setItem("user_id", "test-user-id");
    },
    { token: accessToken }
  );

  await page.goto("/chambers");
  await page
    .getByRole("heading", { name: /Reborn Single Bedroom - 2 Beds/i })
    .click();

  await page.locator(".rdrNextPrevButton.rdrNextButton").click();

  await page.getByText("15", { exact: true }).click();
  await page.getByText("18", { exact: true }).click();

  await page.getByTestId("guests-dropdown-button").click();
  await page.getByRole("option", { name: "2" }).click();

  await page.getByRole("button", { name: /Book Now/i }).click();

  await expect(
    page.getByRole("heading", { name: /Booking Confirmed/i })
  ).toBeVisible();

  await page.getByRole("link", { name: /View Your Reservations/i }).click();

  await expect(page).toHaveURL("/reservations");

  const reservationCard = page.getByRole("heading", {
    name: /Reborn Single Bedroom - 2 Beds/i,
  });

  await expect(reservationCard).toBeVisible();

  await page.getByRole("button", { name: "Delete" }).first().click();

  await page.getByRole("button", { name: "Confirm" }).click();

  await expect(
    page.getByRole("heading", { name: /Reservation Deleted/i })
  ).toBeVisible();

  await page.getByRole("button", { name: /Close/i }).click();

  await expect(
    page.getByRole("heading", { name: /Reborn Single Bedroom - 2 Beds/i })
  ).toHaveCount(0);
});
