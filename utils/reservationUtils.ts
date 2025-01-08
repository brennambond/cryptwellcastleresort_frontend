import apiService from "@/app/services/apiService";
import { differenceInDays, eachDayOfInterval, format } from "date-fns";

export const fetchReservations = async (
  chamberId: string
): Promise<{ startDate: Date; endDate: Date }[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/rooms/rooms/${chamberId}/reservations/`
    );
    const data = await response.json();

    return data.map((reservation: any) => ({
      startDate: new Date(reservation.check_in),
      endDate: new Date(reservation.check_out),
    }));
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return [];
  }
};

export const performBooking = async (
  userId: string | null,
  dateRange: { startDate: Date; endDate: Date },
  guests: string,
  chamber: any,
  setIsSuccessModalOpen: (state: boolean) => void,
  setIsErrorModalOpen: (state: boolean) => void,
  setErrorMessage: (message: string) => void,
  createReservation: Function
) => {
  if (!userId) {
    setIsErrorModalOpen(true);
    setErrorMessage("You need to log in to make a reservation.");
    return;
  }

  try {
    const days = Math.max(
      Math.ceil(
        (dateRange.endDate.getTime() - dateRange.startDate.getTime()) /
          (1000 * 60 * 60 * 24)
      ),
      1
    );
    const totalPrice = (days * chamber.price_per_night).toFixed(2);

    const reservationData = {
      user: userId,
      room: chamber.id,
      check_in: dateRange.startDate.toISOString().split("T")[0],
      check_out: dateRange.endDate.toISOString().split("T")[0],
      guests: parseInt(guests, 10),
      total_price: totalPrice,
    };

    console.log("Payload sent to createReservation:", reservationData);

    const result = await createReservation(reservationData);
    setIsSuccessModalOpen(true);
    console.log("Reservation created successfully:", result);
  } catch (error) {
    console.error("Failed to perform booking:", error);
    setIsErrorModalOpen(true);
    setErrorMessage(
      error instanceof Error ? error.message : "Failed to complete the booking."
    );
  }
};
