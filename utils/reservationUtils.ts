import apiService from "@/app/services/apiService";
import { differenceInDays, eachDayOfInterval, format } from "date-fns";

export const performBooking = async (
  userId: string | null,
  dateRange: any,
  guests: string,
  chamber: any,
  setIsSuccessModalOpen: (state: boolean) => void,
  setIsErrorModalOpen: (state: boolean) => void,
  setErrorMessage: (message: string) => void,
  createReservation: any
) => {
  if (!userId) return;

  if (dateRange.startDate && dateRange.endDate) {
    const formattedStartDate = format(dateRange.startDate, "yyyy-MM-dd");
    const formattedEndDate = format(dateRange.endDate, "yyyy-MM-dd");

    const dayCount = differenceInDays(
      new Date(formattedEndDate),
      new Date(formattedStartDate)
    );
    const subtotal = dayCount * chamber.price_per_night;
    const fee = subtotal * 0.05;
    const totalPrice = subtotal + fee;

    const requestBody = {
      room: chamber.id,
      guests: parseInt(guests, 10) || 1,
      check_in: formattedStartDate,
      check_out: formattedEndDate,
      total_price: totalPrice,
    };

    try {
      await createReservation(requestBody);
      setIsSuccessModalOpen(true);
    } catch (error: any) {
      setErrorMessage(error.message || "Booking failed. Please try again.");
      setIsErrorModalOpen(true);
    }
  }
};

export const fetchReservations = async (
  chamberId: string,
  setBookedDates: (dates: Date[]) => void
) => {
  try {
    const reservations = await apiService.getReservationsByRoom(chamberId);
    if (!Array.isArray(reservations)) return;

    const dates = reservations.flatMap((reservation: any) =>
      eachDayOfInterval({
        start: new Date(reservation.start_date),
        end: new Date(reservation.end_date),
      })
    );
    setBookedDates(dates);
  } catch (error) {
    console.error("Error fetching reservations:", error);
  }
};
