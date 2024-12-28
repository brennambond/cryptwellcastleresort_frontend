import React from "react";
import Modal from "./Modal";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  linkText?: string;
  linkHref?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  linkText,
  linkHref,
}) => {
  const content = (
    <div className='flex flex-col items-center justify-center gap-8 p-regular-16'>
      <p className='text-gray-600 p-regular-18 text-center'>{description}</p>
      {linkText && linkHref && (
        <a
          href={linkHref}
          className='text-blue-500 hover:underline text-center'
          onClick={onClose}
        >
          {linkText}
        </a>
      )}
      <button onClick={onClose} className='button-main'>
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

export default SuccessModal;
