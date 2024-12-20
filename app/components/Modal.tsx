"use client";

import { useState, useEffect, useCallback } from "react";

interface ModalProps {
  label: string;
  close: () => void;
  content: React.ReactElement;
  isOpen: boolean;
  onClick?: () => void;
}

import { HiOutlineX } from "react-icons/hi";

const Modal: React.FC<ModalProps> = ({
  label,
  content,
  isOpen,
  close,
  onClick,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);

    setTimeout(() => {
      close();
    }, 100);
  }, [close]);

  if (!isOpen) {
    return null;
  }
  return (
    <div
      className={`flex items-center justify-center fixed inset-0 z-[99] font-cormorant text-white-main bg-black/60 ${
        showModal ? "overflow-hidden" : "overflow-auto"
      }`}
    >
      <div className='relative w-[90%] md:w-[80%] lg:w-[700px] my-6 mx-auto h-auto'>
        <div
          className={`translate duration-600 h-full ${
            showModal
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-10"
          }`}
        >
          <div className='w-full h-auto rounded-xl relative flex flex-col bg-white-main'>
            <header className='h-[60px] flex items-center p-6 rounded-t justify-center relative border-b bg-gray-800'>
              <div
                onClick={handleClose}
                className='p-3 absolute left-3 hover:bg-gray-900 rounded-full cursor-pointer'
              >
                <HiOutlineX />
              </div>

              <h2 className='p-medium-28 tracking-wider font-germania'>
                {label}
              </h2>
            </header>

            <section onClick={onClick} className='p-6 text-gray-800'>
              {content}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
