import React from "react";
import Modal from "./Modal";

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
}) => {
  const content = (
    <div className='flex flex-col items-center justify-center gap-4 p-regular-16'>
      <p className='text-gray-600 text-center'>{description}</p>
      <button
        onClick={onClose}
        className='mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600'
      >
        Close
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      label={title}
      content={content}
    />
  );
};

export default ErrorModal;
