import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom";
import ReservationCard from "@/app/components/reservations/ReservationCard";

// 👇 mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />, // ✅ This should now work
}));

// 👇 mock modals (prevent crashes during open)
jest.mock("@/app/components/reservations/EditReservationModal", () => () => (
  <div>Edit Modal</div>
));
jest.mock("@/app/components/reservations/DeleteReservationModal", () => () => (
  <div>Delete Modal</div>
));

// 👇 mock API service to avoid actual fetch
jest.mock("@/app/services/apiService", () => ({
  __esModule: true,
  default: {
    get: jest.fn(() => Promise.resolve([])), // return empty bookings
  },
}));

const mockReservation = {
  id: "1",
  check_in: "2025-06-01",
  check_out: "2025-06-04",
  guests: 2,
  total_price: 750,
  number_of_nights: 3,
  room: {
    id: "101",
    title: "Royal Suite",
    image_url: "/royal-suite.jpg",
    wing: {
      name: "Reborn",
    },
    price_per_night: 250,
  },
};

describe("ReservationCard", () => {
  it("renders all reservation details", () => {
    render(<ReservationCard reservation={mockReservation} index={0} />);

    expect(screen.getByText("Royal Suite")).toBeInTheDocument();
    expect(screen.getByText(/Check-in date:/i)).toBeInTheDocument();
    expect(screen.getByText("2025-06-01")).toBeInTheDocument();
    expect(screen.getByText("2025-06-04")).toBeInTheDocument();
    expect(
      screen.getByText(/Number of nights:/i).parentElement
    ).toHaveTextContent("3");
    expect(
      screen.getByText(/Number of guests:/i).parentElement
    ).toHaveTextContent("2");
    expect(screen.getByText(/Total price:/i).parentElement).toHaveTextContent(
      "$750"
    );
  });

  it("renders Edit and Delete buttons", () => {
    render(<ReservationCard reservation={mockReservation} index={0} />);

    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("opens Edit modal when Edit is clicked", async () => {
    render(<ReservationCard reservation={mockReservation} index={0} />);

    fireEvent.click(screen.getByText("Edit"));
    expect(await screen.findByText("Edit Modal")).toBeInTheDocument();
  });

  it("opens Delete modal when Delete is clicked", async () => {
    render(<ReservationCard reservation={mockReservation} index={0} />);

    fireEvent.click(screen.getByText("Delete"));
    expect(await screen.findByText("Delete Modal")).toBeInTheDocument();
  });
});
