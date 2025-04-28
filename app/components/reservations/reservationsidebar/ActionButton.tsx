"use client";

import React, { useState } from "react";
import Spinner from "../../Spinner";
import SuccessModal from "../../SuccessModal";
import ErrorModal from "../../ErrorModal";
import useLoginModal from "@/app/hooks/useLoginModal";

interface ActionButtonProps {
  userId: string | null;
  performBooking: () => Promise<void>;
  button: React.ReactElement;
  isSuccessModalOpen: boolean;
  setIsSuccessModalOpen: (state: boolean) => void;
  isErrorModalOpen: boolean;
  setIsErrorModalOpen: (state: boolean) => void;
  errorMessage: string;
  loading?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  userId,
  performBooking,
  button,
  isSuccessModalOpen,
  setIsSuccessModalOpen,
  isErrorModalOpen,
  setIsErrorModalOpen,
  errorMessage,
  loading,
}) => {
  const loginModal = useLoginModal();
  const [_, setLoading] = useState(false);

  const handleBooking = async () => {
    if (!userId) {
      loginModal.open();
      return;
    }

    setLoading(true);
    try {
      await performBooking();
    } catch (error) {
      console.error("Booking failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex-center'>
      {React.cloneElement(button, {
        onClick: handleBooking,
        disabled: loading,
      })}

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
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
  );
};

export default ActionButton;
