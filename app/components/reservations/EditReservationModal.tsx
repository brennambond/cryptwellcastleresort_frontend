"use client";

import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import SuccessModal from "../SuccessModal";
import ErrorModal from "../ErrorModal";
import apiService from "../../services/apiService";
import Calendar from "../Calendar";

import { Range, RangeKeyDict } from "react-date-range";
import GuestsSelector from "./reservationsidebar/GuestsSelector";
import PricingDetails from "./reservationsidebar/PricingDetails";
import Spinner from "../Spinner";

interface EditReservationModalProps {
  reservation: {
    id: string;
    check_in: string;
    check_out: string;
    guests: number;
    room: {
      id: string;
      title: string;
      price_per_night: number;
      guests: number;
    };
  };
  onClose: () => void;
  bookedDates: { startDate: Date; endDate: Date }[];
}

const EditReservationModal: React.FC<EditReservationModalProps> = ({
  reservation,
  onClose,
  bookedDates,
}) => {
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(`${reservation.check_in}T00:00:00`),
    endDate: new Date(`${reservation.check_out}T00:00:00`),
    key: "selection",
  });
  const [guests, setGuests] = useState<string>(reservation.guests.toString());
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [fee, setFee] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const backgroundColorStyle = "bg-gray-700";

  const flattenedBookedDates: Date[] = bookedDates.flatMap(
    ({ startDate, endDate }) => {
      const dates: Date[] = [];
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return dates;
    }
  );

  const filteredBookedDates: Date[] = flattenedBookedDates.filter((date) => {
    const formattedDate = date.toISOString().split("T")[0];
    return (
      formattedDate < reservation.check_in ||
      formattedDate > reservation.check_out
    );
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const nights = Math.max(
      Math.ceil(
        (new Date(dateRange.endDate || reservation.check_out).getTime() -
          new Date(dateRange.startDate || reservation.check_in).getTime()) /
          (1000 * 60 * 60 * 24)
      ),
      1
    );

    const subtotalCalc = nights * reservation.room.price_per_night;
    const feeCalc = subtotalCalc * 0.05;

    setSubtotal(subtotalCalc);
    setFee(feeCalc);
    setTotalPrice(subtotalCalc + feeCalc);
  }, [dateRange, reservation.room.price_per_night]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const body = {
        check_in: new Date(dateRange.startDate || reservation.check_in)
          .toISOString()
          .split("T")[0],
        check_out: new Date(dateRange.endDate || reservation.check_out)
          .toISOString()
          .split("T")[0],
        guests: Number(guests),
        total_price: totalPrice.toFixed(2),
      };
      await apiService.updateReservation(reservation.id, body);
      setLoading(false);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Failed to update reservation:", error);
      setErrorMessage("Failed to update reservation. Please try again.");
      setIsErrorModalOpen(true);
    }
  };

  const handleSuccessClose = () => {
    setIsSuccessModalOpen(false);
    onClose();
    window.location.reload();
  };

  const handleDateChange = (ranges: RangeKeyDict) => {
    setDateRange(ranges.selection);
  };

  return (
    <>
      <Modal
        isOpen={true}
        onRequestClose={onClose}
        label='Edit Reservation'
        content={
          <div className='flex flex-col items-center gap-6 max-h-[80vh] overflow-y-auto w-full'>
            <Calendar
              value={dateRange}
              onChange={handleDateChange}
              bookedDates={filteredBookedDates}
              backgroundColorStyle={backgroundColorStyle}
            />
            <div className=' w-[90%] lg:w-[80%] xl:w-[60%] flex flex-col border border-gray-400 rounded-xl bg-white shadow-md p-semibold-18 text-center'>
              <div
                className={`block w-full p-medium-24 font-germania ${backgroundColorStyle} text-white tracking-wider p-4 rounded-t-xl`}
              >
                Confirm Booking Details:
              </div>
              <div className='flex flex-col px-4 py-8 gap-8'>
                <GuestsSelector
                  guests={guests}
                  guestsRange={Array.from(
                    { length: reservation.room.guests },
                    (_, i) => (i + 1).toString()
                  )}
                  onChange={(value: any) => setGuests(value)}
                  backgroundColorStyle='bg-gray-700'
                  className='text-white'
                />
                <PricingDetails
                  nights={Math.max(
                    Math.ceil(
                      (new Date(
                        dateRange.endDate || reservation.check_out
                      ).getTime() -
                        new Date(
                          dateRange.startDate || reservation.check_in
                        ).getTime()) /
                        (1000 * 60 * 60 * 24)
                    ),
                    1
                  )}
                  chamberPrice={reservation.room.price_per_night}
                  subtotal={subtotal.toFixed(2)}
                  fee={fee.toFixed(2)}
                  totalPrice={totalPrice}
                  backgroundColorStyle='bg-gray-700'
                  className='text-white'
                />
                <div className='flex-center'>
                  <button
                    onClick={handleSubmit}
                    className='button-main my-4 py-4'
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner size='sm' color='text-white-main' />
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                  <SuccessModal
                    isOpen={isSuccessModalOpen}
                    onClose={handleSuccessClose}
                    title='Reservation Updated'
                    description='Your reservation has been successfully updated.'
                  />
                  <ErrorModal
                    isOpen={isErrorModalOpen}
                    onClose={() => setIsErrorModalOpen(false)}
                    title='Update Failed'
                    description={errorMessage}
                  />
                </div>
              </div>
            </div>
          </div>
        }
      />
    </>
  );
};

export default EditReservationModal;
