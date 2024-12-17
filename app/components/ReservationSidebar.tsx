"use client";

import { useState, useEffect } from "react";
import { Range } from "react-date-range";
import DatePicker from "./Calendar";
import apiService from "@/app/services/apiService";
import useLoginModal from "../hooks/useLoginModal";
import { differenceInDays, eachDayOfInterval, format } from "date-fns";
import CheckoutModal from "./CheckoutModal";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

export type Chamber = {
  id: string;
  title: string;
  description: string; // Added description
  wing: string; // Added wing
  guests: number;
  price_per_night: number;
  image_url: string; // Added image_url
};

interface ReservationSidebarProps {
  userId: string | null;
  chamber: Chamber;
}

const ReservationSidebar: React.FC<ReservationSidebarProps> = ({
  chamber,
  userId,
}) => {
  const loginModal = useLoginModal();
  const [fee, setFee] = useState<number>(0);
  const [nights, setNights] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [guests, setGuests] = useState<string>("1");
  const [bookingSuccess, setBookingSuccess] = useState<boolean | null>(null);

  const guestsRange = Array.from(
    { length: chamber.guests },
    (_, index) => index + 1
  );

  const getReservations = async () => {
    try {
      const reservations = await apiService.getChamberReservations(chamber.id);
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

  const performBooking = async () => {
    if (!userId) {
      loginModal.open();
      return;
    }

    try {
      const bookingDetails = {
        guests: parseInt(guests),
        start_date: format(dateRange.startDate!, "yyyy-MM-dd"),
        end_date: format(dateRange.endDate!, "yyyy-MM-dd"),
        number_of_nights: nights,
        total_price: totalPrice,
      };
      await apiService.bookChamber(chamber.id, bookingDetails);
      setBookingSuccess(true);
    } catch (error) {
      console.error("Booking error:", error);
      setBookingSuccess(false);
    }
  };

  useEffect(() => {
    getReservations();
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount =
        differenceInDays(dateRange.endDate, dateRange.startDate) || 1;
      const calculatedFee = chamber.price_per_night * dayCount * 0.05;
      setFee(calculatedFee);
      setTotalPrice(dayCount * chamber.price_per_night + calculatedFee);
      setNights(dayCount);
    }
  }, [dateRange]);

  return (
    <div className='flex-center flex-col rounded-xl bg-white-main gap-6 pb-10 w-full'>
      <header className='flex-center py-4 rounded-t-xl w-full bg-gray-800'>
        <h2 className='p-medium-28 text-white'>Book Your Stay</h2>
      </header>
      <DatePicker
        value={dateRange}
        bookedDates={bookedDates}
        onChange={(value) => setDateRange(value.selection)}
      />
      <div className='w-[90%] flex flex-col gap-4'>
        <div className='flex flex-row justify-between'>
          <label>Guests:</label>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className='border'
          >
            {guestsRange.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
        <p>Nightly Price: ${chamber.price_per_night}</p>
        <p>Resort Fee: ${fee.toFixed(2)}</p>
        <p>Total: ${totalPrice.toFixed(2)}</p>
      </div>
      {userId ? (
        <CheckoutModal className='button-main' onClick={performBooking} />
      ) : (
        <button className='button-main' onClick={loginModal.open}>
          Login to Book
        </button>
      )}
    </div>
  );
};

export default ReservationSidebar;
