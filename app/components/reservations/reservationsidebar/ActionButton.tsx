import ErrorModal from "../../ErrorModal";
import SuccessModal from "../../SuccessModal";

interface ActionButtonProps {
  userId: string | null;
  performBooking: () => void;
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
}) => (
  <div className='flex-center'>
    {userId ? (
      <button
        onClick={performBooking}
        className={`${buttonColorStyle} button-main-nobg shadow-md`}
      >
        Book Now
      </button>
    ) : (
      <button
        onClick={performBooking}
        className='bg-gray-400 hover:bg-gray-500 button-main-nobg shadow-md'
      >
        Sign-In to Book This Room
      </button>
    )}
    <SuccessModal
      isOpen={isSuccessModalOpen}
      onClose={() => setIsSuccessModalOpen(false)}
      title='Booking Confirmed'
      description='Your reservation has been successfully created!'
      linkText='View Your Reservations'
      linkHref='/myreservations' // Add the link to reservations page
    />
    <ErrorModal
      isOpen={isErrorModalOpen}
      onClose={() => setIsErrorModalOpen(false)}
      title='Booking Failed'
      description={errorMessage}
    />
  </div>
);

export default ActionButton;
