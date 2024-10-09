"use client";

import useLoginModal from "../hooks/useLoginModal";
import CustomButton from "./CustomButton";
import Modal from "./Modal";

const LoginModal = () => {
  const loginModal = useLoginModal();

  const content = (
    <>
      <form className='space-y-4'>
        <input
          placeholder='Your email address'
          type='email'
          className='w-full h-[54px] border border-gray-300 px-4 rounded-xl'
        />
        <input
          placeholder='Your password'
          type='password'
          className='w-full h-[54px] border border-gray-300 px-4 rounded-xl'
        />

        <div className='p-5 bg-airbnb text-white rounded-xl opacity-80'>
          The error message
        </div>

        <CustomButton label='Submit' onClick={() => console.log("Test")} />
      </form>
    </>
  );
  return (
    <Modal
      isOpen={loginModal.isOpen}
      close={loginModal.close}
      label='Log in'
      content={content}
    ></Modal>
  );
};

export default LoginModal;
