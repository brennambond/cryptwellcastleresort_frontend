import React, { useState } from "react";
import ErrorModal from "../../ErrorModal";
import SuccessModal from "../../SuccessModal";
import Spinner from "../../Spinner";
import useLoginModal from "@/app/hooks/useLoginModal";

interface ActionButtonProps {
  userId: string | null;
  performBooking: () => Promise<void>;
  buttonColorStyle: string;
  isSuccessModalOpen: boolean;
  setIsSuccessModalOpen: (state: boolean) => void;
  isErrorModalOpen: boolean;
  setIsErrorModalOpen: (state: boolean) => void;
  errorMessage: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  userId,
  performBooking,
  buttonColorStyle,
  isSuccessModalOpen,
  setIsSuccessModalOpen,
  isErrorModalOpen,
  setIsErrorModalOpen,
  errorMessage,
}) => {
  const loginModal = useLoginModal();
  const [loading, setLoading] = useState(false);

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

  const buttonStyle = userId
    ? `${buttonColorStyle} button-main-nobg shadow-md`
    : "bg-gray-400 hover:bg-gray-500 text-white-main button-main-nobg shadow-md";

  return (
    <div className='flex-center'>
      <button
        onClick={handleBooking}
        className={buttonStyle}
        disabled={loading}
      >
        {loading ? (
          <Spinner size='sm' color='text-white-main' />
        ) : userId ? (
          "Book Now"
        ) : (
          "Sign-In to Book This Chamber"
        )}
      </button>

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
