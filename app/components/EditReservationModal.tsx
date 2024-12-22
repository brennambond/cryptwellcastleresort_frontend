import React, { useState } from "react";
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
    startDate: new Date(reservation.check_in),
    endDate: new Date(reservation.check_out),
    key: "selection",
  });
  const [guests, setGuests] = useState(reservation.guests);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

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
    onClose(); // Close the EditReservationModal
    window.location.reload(); // Refresh the page
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
          <div className='flex flex-col gap-4'>
            <h2 className='text-lg font-bold'>Edit Your Reservation</h2>
            <DatePicker
              value={dateRange}
              onChange={handleDateChange}
              bookedDates={bookedDates}
            />
            <label>
              Guests:
              <input
                type='number'
                value={guests}
                min='1'
                onChange={(e) => setGuests(Number(e.target.value))}
                className='border p-2 rounded-md w-full'
              />
            </label>
            <button
              type='button'
              onClick={handleSubmit}
              className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'
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
