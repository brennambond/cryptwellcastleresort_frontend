"use client";

import { useState, useEffect, useMemo } from "react";
import { Range } from "react-date-range";

import Calendar from "../../Calendar";
import GuestsSelector from "./GuestsSelector";
import PricingDetails from "./PricingDetails";
import ActionButton from "./ActionButton";

import useLoginModal from "../../../hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { getStylesForChamber } from "@/utils/stylingUtils";
import { differenceInDays } from "date-fns";
import { fetchReservations, performBooking } from "@/utils/reservationUtils";
import { createReservation } from "@/app/lib/actions";

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
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [guests, setGuests] = useState<string>("1");

  const router = useRouter();

  const guestsRange = useMemo(
    () =>
      Array.from({ length: chamber.guests }, (_, index) =>
        (index + 1).toString()
      ),
    [chamber.guests]
  );

  const { backgroundColorStyle, buttonColorStyle } = getStylesForChamber(
    chamber.title
  );

  const { subtotal, fee, totalPrice, nights } = useMemo(() => {
    const dayCount = differenceInDays(
      dateRange.endDate || new Date(),
      dateRange.startDate || new Date()
    );
    const subtotal = dayCount * chamber.price_per_night;
    const fee = subtotal * 0.05;
    const totalPrice = subtotal + fee;

    return {
      subtotal,
      fee,
      totalPrice,
      nights: dayCount || 1,
    };
  }, [dateRange, chamber.price_per_night]);

  useEffect(() => {
    const loadBookedDates = async () => {
      try {
        const reservations = await fetchReservations(chamber.id);
        const dates = reservations.flatMap(
          (res: { startDate: Date; endDate: Date }) => {
            const range: Date[] = [];
            let currentDate = new Date(res.startDate);
            while (currentDate <= res.endDate) {
              range.push(new Date(currentDate));
              currentDate.setDate(currentDate.getDate() + 1);
            }
            return range;
          }
        );
        setBookedDates(dates);
      } catch (error) {
        console.error("Failed to fetch reservations:", error);
      }
    };

    loadBookedDates();
  }, [chamber.id]);

  const handleBooking = async () => {
    const validDateRange = {
      startDate: dateRange.startDate || new Date(),
      endDate: dateRange.endDate || new Date(),
    };

    await performBooking(
      userId,
      validDateRange,
      guests,
      chamber,
      setIsSuccessModalOpen,
      setIsErrorModalOpen,
      setErrorMessage,
      createReservation
    );
  };

  console.log(bookedDates);

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
        className={` w-[90%] lg:w-[80%] xl:w-[60%]  flex flex-col border border-gray-400 rounded-xl bg-white shadow-md p-semibold-18`}
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
            subtotal={subtotal}
            fee={fee}
            totalPrice={totalPrice}
            backgroundColorStyle={backgroundColorStyle}
          />

          {/* ActionButton.tsx */}
          <ActionButton
            userId={userId}
            performBooking={handleBooking}
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
