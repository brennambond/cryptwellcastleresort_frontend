import { test, expect } from "@playwright/test";

test("User can create, edit, and delete a reservation", async ({
  page,
  request,
}) => {
  const today = new Date();

  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() + 7);

  const endDate = new Date(today);
  endDate.setDate(endDate.getDate() + 10);

  const newStartDate = new Date(today);
  newStartDate.setDate(newStartDate.getDate() + 8);

  const newEndDate = new Date(today);
  newEndDate.setDate(newEndDate.getDate() + 11);

  const formatDay = (date: Date) => date.getDate().toString();
  const formattedStart = formatDay(startDate);
  const formattedEnd = formatDay(endDate);
  const formattedNewStart = formatDay(newStartDate);
  const formattedNewEnd = formatDay(newEndDate);

  const formatFullDate = (date: Date) => date.toISOString().split("T")[0];
  const fullNewStart = formatFullDate(newStartDate);
  const fullNewEnd = formatFullDate(newEndDate);

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
  await page.locator('[class*="rdrNextButton"]').click();
  await page.getByText(formattedStart, { exact: true }).click();
  await page.getByText(formattedEnd, { exact: true }).click();

  await page.getByTestId("guests-dropdown-button").click();
  await page.getByRole("option", { name: "2" }).click();

  await page.getByRole("button", { name: /Book Now/i }).click();
  await expect(
    page.getByRole("heading", { name: /Booking Confirmed/i })
  ).toBeVisible();

  await page.getByRole("link", { name: /View Your Reservations/i }).click();
  await expect(page).toHaveURL("/reservations");

  const reservationTitle = "Reborn Single Bedroom - 2 Beds";
  await expect(
    page.getByRole("heading", { name: reservationTitle })
  ).toBeVisible();

  await page.getByRole("button", { name: "Edit" }).first().click();
  await page.getByText(formattedNewStart, { exact: true }).click();
  await page.getByText(formattedNewEnd, { exact: true }).click();

  await page.getByRole("button", { name: "Save Changes" }).click();
  await expect(
    page.getByRole("heading", { name: /Reservation Updated/i })
  ).toBeVisible();

  await Promise.all([
    page.waitForNavigation({ waitUntil: "domcontentloaded" }),
    page.getByRole("button", { name: /Close/i }).click(),
  ]);

  await expect(page).toHaveURL("/reservations");

  await expect(page.getByText(fullNewStart)).toBeVisible();
  await expect(page.getByText(fullNewEnd)).toBeVisible();

  await page.getByRole("button", { name: "Delete" }).first().click();
  await page.getByRole("button", { name: "Confirm" }).click();
  await expect(
    page.getByRole("heading", { name: /Reservation Deleted/i })
  ).toBeVisible();
  await page.getByRole("button", { name: /Close/i }).click();

  await expect(
    page.getByRole("heading", { name: reservationTitle })
  ).toHaveCount(0);
});
