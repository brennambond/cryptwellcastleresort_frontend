"use client";

import { HiOutlineX } from "react-icons/hi";

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  label: string;
  content: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onRequestClose,
  label,
  content,
}) => {
  if (!isOpen) {
    return null;
  }
  console.log("Modal isOpen prop:", isOpen);

  return (
    <div className='flex items-center justify-center fixed inset-0 z-[100] font-cormorant text-white-main bg-black/60'>
      <div className='relative w-[90%] md:w-[80%] lg:w-[700px] my-6 mx-auto h-auto'>
        <div className='w-full h-auto rounded-xl relative flex flex-col bg-white-main'>
          <header className='h-[60px] flex items-center p-6 rounded-t justify-center relative border-b bg-gray-800'>
            <div
              onClick={onRequestClose}
              className='p-3 absolute left-3 hover:bg-gray-900 rounded-full cursor-pointer'
            >
              <HiOutlineX />
            </div>

            <h2 className='p-medium-28 tracking-wider font-germania'>
              {label}
            </h2>
          </header>

          <section className='p-6 text-gray-800'>{content}</section>
        </div>
      </div>
    </div>
  );
};

export default Modal;
