import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom";
import EditReservationModal from "@/app/components/reservations/EditReservationModal";

jest.mock("@/app/components/Calendar", () => () => (
  <div>Calendar Component</div>
));
jest.mock(
  "@/app/components/reservations/reservationsidebar/GuestsSelector",
  () => (props: any) =>
    (
      <div>
        GuestsSelector
        <select
          onChange={(e) => props.onChange(Number(e.target.value))}
          data-testid='guest-select'
        >
          {[...Array(10)].map((_, i) => (
            <option key={i} value={(i + 1).toString()}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
    )
);
jest.mock(
  "@/app/components/reservations/reservationsidebar/PricingDetails",
  () => () => <div>PricingDetails</div>
);
jest.mock(
  "@/app/components/SuccessModal",
  () => (props: any) => props.isOpen ? <div>SuccessModal</div> : null
);
jest.mock(
  "@/app/components/ErrorModal",
  () => (props: any) => props.isOpen ? <div>ErrorModal</div> : null
);
jest.mock("@/app/components/Spinner", () => () => <div>Loading...</div>);

jest.mock("@/app/services/apiService", () => ({
  __esModule: true,
  default: {
    updateReservation: jest.fn(() => Promise.resolve({})),
  },
}));

const mockReservation = {
  id: "1",
  check_in: "2025-05-01",
  check_out: "2025-05-04",
  guests: 2,
  room: {
    id: "101",
    title: "Royal Suite",
    price_per_night: 200,
  },
};

const bookedDates = [
  { startDate: new Date("2025-05-10"), endDate: new Date("2025-05-15") },
];

describe("EditReservationModal", () => {
  it("renders the modal and allows guest change", () => {
    render(
      <EditReservationModal
        reservation={mockReservation}
        bookedDates={bookedDates}
        onClose={jest.fn()}
      />
    );
    expect(screen.getByText("Calendar Component")).toBeInTheDocument();
    expect(screen.getByText("GuestsSelector")).toBeInTheDocument();

    const guestSelect = screen.getByTestId("guest-select") as HTMLSelectElement;
    fireEvent.change(guestSelect, { target: { value: "4" } });
    expect(guestSelect.value).toBe("4");
  });

  it("submits the form and shows success modal", async () => {
    render(
      <EditReservationModal
        reservation={mockReservation}
        bookedDates={bookedDates}
        onClose={jest.fn()}
      />
    );
    const button = screen.getByText("Save Changes");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("SuccessModal")).toBeInTheDocument();
    });
  });

  it("shows error modal when update fails", async () => {
    const { default: apiService } = await import("@/app/services/apiService");
    (apiService.updateReservation as jest.Mock).mockRejectedValueOnce(
      new Error("Update failed")
    );

    render(
      <EditReservationModal
        reservation={mockReservation}
        bookedDates={bookedDates}
        onClose={jest.fn()}
      />
    );

    const button = screen.getByText("Save Changes");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("ErrorModal")).toBeInTheDocument();
    });
  });
});
