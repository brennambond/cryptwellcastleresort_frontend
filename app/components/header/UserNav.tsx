"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { HiUser } from "react-icons/hi2";
import MenuLink from "./MenuLink";
import LogoutButton from "./LogoutButton";

import useLoginModal from "../../hooks/useLoginModal";
import useSignupModal from "../../hooks/useSignupModal";

interface UserNavProps {
  userId?: string | null;
}

const UserNav: React.FC<UserNavProps> = ({ userId }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const signupModal = useSignupModal();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='h-8 relative flex items-center justify-center rounded-full shadow-2xl'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center justify-between gap-2 text-purple-950'
      >
        <span className='rounded-full bg-gray-300 p-1 sm:h-8 sm:w-8 md:w-9 md:h-9 flex-center'>
          <HiUser className='sm:h-5 sm:w-5 md:h-6 md:w-6' />
        </span>
      </button>

      {isOpen && (
        <div className='w-[120px] sm:w-[160px] xl:w-[200px] absolute top-[40px] -right-2 md:-right-6 xl:-right-4 bg-white border rounded-xl shadow-md flex flex-col cursor-pointer z-[99]'>
          {userId ? (
            <>
              <MenuLink
                label='My Reservations'
                onClick={() => {
                  setIsOpen(false);
                  router.push("/myreservations");
                }}
              />
              <LogoutButton />
            </>
          ) : (
            <>
              <MenuLink
                label='Log in'
                onClick={() => {
                  setIsOpen(false);
                  loginModal.open();
                  router.push("/");
                }}
              />
              <MenuLink
                label='Sign up'
                onClick={() => {
                  setIsOpen(false);
                  signupModal.open();
                }}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserNav;
