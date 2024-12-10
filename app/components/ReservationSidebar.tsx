"use client";

import { useState, useEffect } from "react";
import { Range } from "react-date-range";

import DatePicker from "./Calendar";

import apiService from "../services/apiService";
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
  guests: number;
  price_per_night: number;
  title: string;
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
  const [minDate, setMinDate] = useState<Date>(new Date());
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [guests, setGuests] = useState<string>("1");
  const guestsRange = Array.from(
    { length: chamber.guests },
    (_, index) => index + 1
  );

  var chamberTitle = chamber.title.split(" ")[0].toString();

  const backgroundColorStyle = [
    chamberTitle === "Bloodborn"
      ? "bg-red-900"
      : chamberTitle === "Haunted"
      ? "bg-cyan-900"
      : chamberTitle === "Reborn"
      ? "bg-emerald-900"
      : "bg-fuchsia-950",
  ];

  const buttonColorStyle = [
    chamberTitle === "Bloodborn"
      ? "bg-red-900 hover:bg-red-800"
      : chamberTitle === "Haunted"
      ? "bg-cyan-900 bg:text-cyan-800"
      : chamberTitle === "Reborn"
      ? "bg-emerald-900 hover:bg-emerald-800"
      : "bg-fuchsia-950 hover:bg-fuchsia-900",
  ];

  const performBooking = async () => {
    if (userId) {
      if (dateRange.startDate && dateRange.endDate) {
        const formData = new FormData();
        formData.append("guests", guests);
        formData.append(
          "start_date",
          format(dateRange.startDate, "yyyy-MM-dd")
        );
        formData.append("end_date", format(dateRange.endDate, "yyyy-MM-dd"));
        formData.append("number_of_nights", nights.toString());
        formData.append("total_price", totalPrice.toString());

        const response = await apiService.post(
          `/api/rooms/${chamber.id}/book/`,
          formData
        );

        if (response.success) {
          console.log("Booking successful");
        } else {
          console.log("Something went wrong...");
        }
      }
    } else {
      loginModal.open();
    }
  };

  const _setDateRange = (selection: any) => {
    const newStartDate = new Date(selection.startDate);
    const newEndDate = new Date(selection.endDate);

    if (newEndDate <= newStartDate) {
      newEndDate.setDate(newStartDate.getDate() + 1);
    }

    setDateRange({
      ...dateRange,
      startDate: newStartDate,
      endDate: newEndDate,
    });
  };

  const getReservations = async () => {
    const reservations = await apiService.get(
      `/api/rooms/${chamber.id}/reservations/`
    );

    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.start_date),
        end: new Date(reservation.end_date),
      });

      dates = [...dates, ...range];
    });

    setBookedDates(dates);
  };

  useEffect(() => {
    getReservations();
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && chamber.price_per_night) {
        const _fee = ((dayCount * chamber.price_per_night) / 100) * 5;

        setFee(_fee);
        setTotalPrice(dayCount * chamber.price_per_night + _fee);
        setNights(dayCount);
      } else {
        const _fee = (chamber.price_per_night / 100) * 5;

        setFee(_fee);
        setTotalPrice(chamber.price_per_night + _fee);
        setNights(1);
      }
    }
  }, [dateRange]);

  return (
    <div className='flex-center flex-col rounded-xl bg-white-main gap-6 pb-10 w-full sm:w-[90%] md:w-[80%]'>
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
        onChange={(value) => _setDateRange(value.selection)}
      />

      <div className='w-[90%] lg:w-[80%] xl:w-[60%] flex-center flex-col border border-gray-400 rounded-xl bg-white p-semibold-18'>
        <div className='flex-center flex-col lg:grid lg:grid-cols-3 w-full'>
          <div
            id='guests-div'
            className={`flex flex-col lg:col-span-1 text-gray-700 lg:border-b rounded-t-xl lg:rounded-tr-none lg:rounded-tl-xl lg:border-gray-400 w-full lg:h-full`}
          >
            <label
              className={`${backgroundColorStyle} text-white-main w-full p-bold-20 rounded-t-xl lg:rounded-tr-none lg:rounded-tl-xl text-center py-1`}
            >
              Guests
            </label>

            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className='mx-8 md:mx-10 lg:mx-4 my-2 lg:my-4'
            >
              {guestsRange.map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </select>
          </div>

          <div
            id='nights-div'
            className={`flex-center flex-col lg:col-span-2 text-gray-700 text-center lg:rounded-tr-xl lg:border-l lg:border-gray-400 w-full`}
          >
            <label
              className={`${backgroundColorStyle} text-white-main w-full p-bold-20 lg:rounded-tr-xl  py-1`}
            >
              Costs
            </label>
            <p className='border-b border-gray-400 w-full py-2'>
              Chamber Price x {nights} {nights > 1 ? "Nights" : "Night"}: $
              {chamber.price_per_night * nights}
            </p>

            <p
              className={` w-full text-gray-700 py-2 border-b border-gray-400`}
            >
              Resort Fee: ${fee}
            </p>
          </div>
        </div>

        <div
          id='total-div'
          className={`mb-4 flex justify-between items-center mt-4 p-bold-24 text-gray-700`}
        >
          <p>Total: ${totalPrice}</p>
        </div>
      </div>

      <div
        onClick={performBooking}
        className={`button-main-nobg xl:mt-4 ${buttonColorStyle}`}
      >
        Book
      </div>
      <CheckoutModal
        className={`button-main-nobg xl:mt-4 ${buttonColorStyle}`}
      />
    </div>
  );
};

export default ReservationSidebar;
