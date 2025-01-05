"use client";

import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import SuccessModal from "./SuccessModal";
import apiService from "../services/apiService";
import DatePicker from "./Calendar";
import { Range, RangeKeyDict } from "react-date-range";

interface EditReservationModalProps {
  reservation: {
    id: string;
    check_in: string;
    check_out: string;
    guests: number;
  };
  onClose: () => void;
  bookedDates: Date[];
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
  const [guests, setGuests] = useState(reservation.guests);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const normalizedBookedDates = bookedDates.map((date) => {
    const [year, month, day] = date.toISOString().split("T")[0].split("-");
    return new Date(Number(year), Number(month) - 1, Number(day));
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = async () => {
    try {
      const body = {
        check_in: dateRange.startDate?.toISOString().split("T")[0],
        check_out: dateRange.endDate?.toISOString().split("T")[0],
        guests,
      };
      await apiService.updateReservation(reservation.id, body);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Failed to update reservation:", error);
      alert("Failed to update reservation. Please try again.");
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
          <div className='flex-center flex-col gap-4 max-h-[80vh]'>
            <h2 className='text-lg font-bold'>Edit Your Reservation</h2>
            <DatePicker
              value={dateRange}
              onChange={handleDateChange}
              bookedDates={normalizedBookedDates}
            />
            <label className='flex flex-col'>
              Guests:
              <input
                type='number'
                value={guests}
                min='1'
                onChange={(e) => setGuests(Number(e.target.value))}
                className='border p-2 rounded-md '
              />
            </label>
            <button
              type='button'
              onClick={handleSubmit}
              className='button-main my-4 py-4'
            >
              Save Changes
            </button>
          </div>
        }
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessClose}
        title='Reservation Updated'
        description='Your reservation has been successfully updated.'
      />
    </>
  );
};

export default EditReservationModal;
