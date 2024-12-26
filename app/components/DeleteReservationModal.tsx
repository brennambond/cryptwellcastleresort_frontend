"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import SuccessModal from "./SuccessModal";
import apiService from "../services/apiService";

interface DeleteReservationModalProps {
  reservationId: string;
  onClose: () => void;
}

const DeleteReservationModal: React.FC<DeleteReservationModalProps> = ({
  reservationId,
  onClose,
}) => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await apiService.deleteReservation(reservationId);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Failed to delete reservation:", error);
      alert("Failed to delete reservation. Please try again.");
    }
  };

  const handleSuccessClose = () => {
    setIsSuccessModalOpen(false);
    onClose(); // Close the DeleteReservationModal
    window.location.reload(); // Refresh the page
  };

  return (
    <>
      <Modal
        isOpen={true}
        onRequestClose={onClose}
        label='Delete Reservation'
        content={
          <div className='flex flex-col gap-4'>
            <p>Are you sure you want to delete this reservation?</p>
            <div className='flex justify-end gap-4'>
              <button
                onClick={onClose}
                className='bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600'
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className='bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600'
              >
                Confirm
              </button>
            </div>
          </div>
        }
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessClose}
        title='Reservation Deleted'
        description='Your reservation has been successfully deleted.'
      />
    </>
  );
};

export default DeleteReservationModal;
