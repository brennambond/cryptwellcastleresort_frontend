"use client";

import { useState, useEffect } from "react";
import { Range } from "react-date-range";

import DatePicker from "./Calendar";

import { createReservation } from "../lib/actions";
import useLoginModal from "../hooks/useLoginModal";
import { differenceInDays, eachDayOfInterval, format } from "date-fns";
import { useRouter } from "next/navigation";
import apiService from "../services/apiService";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";

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

  // Dynamic styling based on chamber title
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

  const performBooking = async () => {
    if (userId) {
      if (dateRange.startDate && dateRange.endDate) {
        const formattedStartDate = format(dateRange.startDate, "yyyy-MM-dd");
        const formattedEndDate = format(dateRange.endDate, "yyyy-MM-dd");

        const requestBody = {
          room: chamber.id,
          guests: parseInt(guests, 10) || 1,
          check_in: formattedStartDate,
          check_out: formattedEndDate,
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

      <DatePicker
        value={dateRange}
        bookedDates={bookedDates}
        onChange={(value) => setDateRange(value.selection)}
      />

      <div className='w-[90%] lg:w-[80%] xl:w-[60%] flex-center flex-col border border-gray-400 rounded-xl bg-white p-semibold-18'>
        <div className='flex-center flex-col lg:grid lg:grid-cols-3 w-full'>
          <div className='text-gray-700 lg:border-b rounded-t-xl w-full'>
            <label
              className={`${backgroundColorStyle} text-white-main w-full p-bold-20 rounded-t-xl text-center py-1`}
            >
              Guests
            </label>

            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className='mx-8 my-2'
            >
              {guestsRange.map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </select>
          </div>

          <div className='flex-center flex-col text-gray-700 text-center lg:rounded-tr-xl lg:border-l w-full'>
            <label
              className={`${backgroundColorStyle} text-white-main w-full p-bold-20 lg:rounded-tr-xl py-1`}
            >
              Costs
            </label>
            <p className='border-b w-full py-2'>
              Chamber Price x {nights} {nights > 1 ? "Nights" : "Night"}: $
              {chamber.price_per_night * nights}
            </p>

            <p className='py-2 border-b w-full'>Resort Fee: ${fee}</p>
          </div>
        </div>

        <div className='mb-4 flex justify-between items-center mt-4 p-bold-24 text-gray-700'>
          <p>Total: ${totalPrice}</p>
        </div>
      </div>
      {userId ? (
        <div>
          <button
            onClick={performBooking}
            className={`button-main-nobg xl:mt-4 ${buttonColorStyle}`}
          >
            Book Now
          </button>

          <SuccessModal
            isOpen={isSuccessModalOpen}
            onClose={() => {
              setIsSuccessModalOpen(false);
              router.push("/myreservations"); // Redirect after closing modal
            }}
            title='Booking Confirmed'
            description='Your reservation has been successfully created!'
            linkText='View Your Reservations'
            linkHref='/myreservations'
          />
          <ErrorModal
            isOpen={isErrorModalOpen}
            onClose={() => setIsErrorModalOpen(false)}
            title='Booking Failed'
            description={errorMessage}
          />
        </div>
      ) : (
        <button
          onClick={performBooking}
          className={`button-main-nobg xl:mt-4 ${buttonColorStyle}`}
        >
          Sign-In to Book This Room
        </button>
      )}
    </div>
  );
};

export default ReservationSidebar;
