import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DeleteReservationModal from "@/app/components/reservations/DeleteReservationModal";
import "@testing-library/jest-dom";

// 🔌 Mock dependencies
jest.mock("@/app/components/Modal", () => (props: any) => (
  <div>
    <div>{props.label}</div>
    <div>{props.content}</div>
  </div>
));
jest.mock(
  "@/app/components/SuccessModal",
  () => (props: any) => props.isOpen ? <div>SuccessModal</div> : null
);
jest.mock("@/app/components/Spinner", () => () => <div>Loading...</div>);

const mockDelete: jest.Mock<Promise<any>, [string]> = jest.fn();

jest.mock("@/app/services/apiService", () => ({
  __esModule: true,
  default: {
    deleteReservation: (id: string) => mockDelete(id),
  },
}));

describe("DeleteReservationModal", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders confirmation and buttons", () => {
    render(<DeleteReservationModal reservationId='1' onClose={mockOnClose} />);

    expect(screen.getByText("Delete Reservation")).toBeInTheDocument();
    expect(
      screen.getByText(/Are you sure you want to delete this reservation?/i)
    ).toBeInTheDocument();

    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Confirm")).toBeInTheDocument();
  });

  it("calls onClose when Cancel is clicked", () => {
    render(<DeleteReservationModal reservationId='1' onClose={mockOnClose} />);
    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("deletes reservation and shows success modal", async () => {
    render(<DeleteReservationModal reservationId='1' onClose={mockOnClose} />);
    fireEvent.click(screen.getByText("Confirm"));

    expect(mockDelete).toHaveBeenCalledWith("1");

    await waitFor(() => {
      expect(screen.getByText("SuccessModal")).toBeInTheDocument();
    });
  });
});
