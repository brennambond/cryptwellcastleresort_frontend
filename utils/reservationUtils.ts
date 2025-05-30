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

export const calculateTotalPrice = (
  nights: number,
  pricePerNight: number,
  resortFeeRate: number = 0.05
): { subtotal: number; fee: number; total: number } => {
  const subtotal = nights * pricePerNight;
  const fee = subtotal * resortFeeRate;
  const total = subtotal + fee;
  return { subtotal, fee, total };
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
    const nights = Math.max(
      Math.ceil(
        (dateRange.endDate.getTime() - dateRange.startDate.getTime()) /
          (1000 * 60 * 60 * 24)
      ),
      1
    );

    const subtotal = nights * chamber.price_per_night;
    const fee = subtotal * 0.05;
    const totalPrice = subtotal + fee;

    const reservationData = {
      user: userId,
      room: chamber.id,
      check_in: dateRange.startDate.toISOString().split("T")[0],
      check_out: dateRange.endDate.toISOString().split("T")[0],
      guests: parseInt(guests, 10),
      total_price: totalPrice.toFixed(2),
    };

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
