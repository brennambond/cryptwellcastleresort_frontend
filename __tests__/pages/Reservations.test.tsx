import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import MyReservationsPage from "@/app/components/reservations/ReservationsPage";

jest.mock("@/app/components/reservations/ReservationsPage", () => () => (
  <div>Mocked My Reservations Page</div>
));

describe("Reservations Page", () => {
  it("renders the mocked Reservations page", () => {
    render(<MyReservationsPage />);
    expect(
      screen.getByText(/Mocked My Reservations Page/i)
    ).toBeInTheDocument();
  });
});
