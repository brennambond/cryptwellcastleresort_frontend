"use client";

import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

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
    onClose();
    window.location.reload();
  };

  return (
    <>
      <Modal
        isOpen={true}
        onRequestClose={onClose}
        label='Delete Reservation'
        content={
          <div className='flex flex-col items-center justify-center gap-6 p-regular-16 z-[99]'>
            <p className='text-gray-600 text-center p-medium-20'>
              Are you sure you want to delete this reservation?
            </p>
            <div className='flex gap-16'>
              <button
                onClick={onClose}
                className='bg-gray-400 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-500 button-mini'
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className='bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 button-mini'
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
