import React from "react";
import Modal from "../Modal";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const content = (
    <div className='flex flex-col items-center justify-center gap-4 p-regular-16'>
      <p className='text-gray-600 text-center'>
        Are you sure you want to log out?
      </p>
      <div className='flex gap-4'>
        <button
          onClick={onConfirm}
          className='bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600'
        >
          Yes
        </button>
        <button
          onClick={onClose}
          className='bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400'
        >
          No
        </button>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      label='Confirm Logout'
      content={content}
    />
  );
};

export default LogoutModal;
