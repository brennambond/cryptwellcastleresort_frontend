"use client";

import { useState, useEffect } from "react";
import { Range } from "react-date-range";

import Calendar from "../../Calendar";

import { createReservation } from "../../../lib/actions";
import useLoginModal from "../../../hooks/useLoginModal";
import { differenceInDays, eachDayOfInterval, format } from "date-fns";
import { useRouter } from "next/navigation";
import apiService from "../../../services/apiService";
import GuestsSelector from "./GuestsSelector";
import PricingDetails from "./PricingDetails";
import ActionButton from "./ActionButton";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

export type Chamber = {
  id: string;
  guests: number;
  price_per_night: number;
  title: string;
  image_url: string;
  wing: string;
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
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [fee, setFee] = useState<number>(0);
  const [nights, setNights] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [guests, setGuests] = useState<string>("1");

  const router = useRouter();

  const guestsRange = Array.from(
    { length: chamber.guests },
    (_, index) => index + 1
  );

  const backgroundColorStyle = chamber.title.startsWith("Bloodborn")
    ? "bg-red-900"
    : chamber.title.startsWith("Haunted")
    ? "bg-cyan-900"
    : chamber.title.startsWith("Reborn")
    ? "bg-emerald-900"
    : "bg-fuchsia-950";

  const buttonColorStyle = chamber.title.startsWith("Bloodborn")
    ? "bg-red-900 hover:bg-red-800"
    : chamber.title.startsWith("Haunted")
    ? "bg-cyan-900 hover:bg-cyan-800"
    : chamber.title.startsWith("Reborn")
    ? "bg-emerald-900 hover:bg-emerald-800"
    : "bg-fuchsia-950 hover:bg-fuchsia-900";

  const dropdownColorStyle = chamber.title.startsWith("Bloodborn")
    ? "bg-red-900"
    : chamber.title.startsWith("Haunted")
    ? "bg-cyan-900"
    : chamber.title.startsWith("Reborn")
    ? "bg-emerald-900"
    : "bg-fuchsia-950";

  useEffect(() => {
    const dayCount = differenceInDays(
      dateRange.endDate as Date,
      dateRange.startDate as Date
    );
    const subtotal = dayCount * chamber.price_per_night;
    const fee = subtotal * 0.05;
    setFee(fee);
    setTotalPrice(subtotal + fee);
    setNights(dayCount || 1);
  }, [dateRange, chamber.price_per_night]);

  const performBooking = async () => {
    if (userId) {
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
          const result = await createReservation(requestBody);
          console.log("Booking successful:", result); // Log successful response
          setIsSuccessModalOpen(true); // Refresh or redirect as needed
        } catch (error: any) {
          setErrorMessage(error.message || "Booking failed. Please try again.");
          setIsErrorModalOpen(true);
        }
      }
    } else {
      loginModal.open();
    }
  };

  const getReservations = async () => {
    try {
      const reservations = await apiService.getReservationsByRoom(chamber.id);
      if (!Array.isArray(reservations)) {
        console.warn("Unexpected response format:", reservations);
        return;
      }

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

  useEffect(() => {
    getReservations();
    return () => setBookedDates([]);
  }, []);

  useEffect(() => {
    const dayCount = differenceInDays(
      dateRange.endDate as Date,
      dateRange.startDate as Date
    );
    const fee = dayCount * chamber.price_per_night * 0.05 || 0;
    setFee(fee);
    setTotalPrice(dayCount * chamber.price_per_night + fee);
    setNights(dayCount || 1);
  }, [dateRange]);

  return (
    <div className='flex-center flex-col rounded-xl bg-white-main gap-6 pb-10 w-full sm:w-[90%] md:w-[80%] lg:w-[70%] 2xl:w-[60%]'>
      <header
        className={`flex-center py-4 rounded-t-xl w-full border-b border-gray-400 ${backgroundColorStyle}`}
      >
        <h2 className='p-medium-28 tracking-wider font-germania'>
          Book Your Stay
        </h2>
      </header>

      <Calendar
        value={dateRange}
        bookedDates={bookedDates}
        onChange={(value) => setDateRange(value.selection)}
        backgroundColorStyle={backgroundColorStyle}
      />

      <div
        id='test'
        className={`w-full lg:w-[80%] xl:w-[60%] flex flex-col border border-gray-400 rounded-xl bg-white shadow-md p-semibold-18`}
      >
        <div
          className={`${backgroundColorStyle} block w-full p-medium-24 font-germania  tracking-wider p-4 rounded-t-xl`}
        >
          Confirm Booking Details:
        </div>
        <div className='flex flex-col px-4 py-8 gap-8'>
          {/* GuestsSelector.tsx */}
          <GuestsSelector
            guests={guests}
            guestsRange={guestsRange.map(String)}
            onChange={(value) => setGuests(value)}
            backgroundColorStyle={backgroundColorStyle}
          />

          {/* PricingDetails.tsx */}
          <PricingDetails
            nights={nights}
            chamberPrice={chamber.price_per_night}
            fee={fee}
            totalPrice={totalPrice}
            backgroundColorStyle={backgroundColorStyle}
          />

          {/* ActionButton.tsx */}
          <ActionButton
            userId={userId}
            performBooking={performBooking}
            buttonColorStyle={buttonColorStyle}
            isSuccessModalOpen={isSuccessModalOpen}
            setIsSuccessModalOpen={setIsSuccessModalOpen}
            isErrorModalOpen={isErrorModalOpen}
            setIsErrorModalOpen={setIsErrorModalOpen}
            errorMessage={errorMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default ReservationSidebar;
