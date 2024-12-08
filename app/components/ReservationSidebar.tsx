"use client";

import { useState, useEffect } from "react";
import { Range } from "react-date-range";

import DatePicker from "./Calendar";

import apiService from "../services/apiService";
import useLoginModal from "../hooks/useLoginModal";
import { differenceInDays, eachDayOfInterval, format } from "date-fns";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

export type Chamber = {
  id: string;
  guests: number;
  price_per_night: number;
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
    <aside className='mt-6 p-6 col-span-2 rounded-xl border border-gray-300 shadow-xl bg-white-main'>
      <h2 className='mb-5 text-2xl'>${chamber.price_per_night} per night</h2>

      <DatePicker
        value={dateRange}
        bookedDates={bookedDates}
        onChange={(value) => _setDateRange(value.selection)}
      />

      <div className='mb-6 p-3 border border-gray-400 rounded-xl'>
        <label className='mb-2 block font-bold text-xs'>Guests</label>

        <select
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className='w-full -ml-1 text-xs'
        >
          {guestsRange.map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
      </div>

      <div
        onClick={performBooking}
        className='cursor-pointer w-full mb-6 py-6 text-center text-white bg-blue-main rounded-xl'
      >
        Book
      </div>

      <div className='mb-4 flex justify-between items-center'>
        <p>
          ${chamber.price_per_night} * {nights} nights
        </p>

        <p>${chamber.price_per_night * nights}</p>
      </div>

      <div className='mb-4 flex justify-between items-center'>
        <p>Haunted Hotel Fee</p>

        <p>${fee}</p>
      </div>

      <hr />

      <div className='mt-4 flex justify-between items-center font-bold'>
        <p>Total</p>

        <p>${totalPrice}</p>
      </div>
    </aside>
  );
};

export default ReservationSidebar;
