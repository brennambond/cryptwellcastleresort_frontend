"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { HiMenu, HiOutlineUser } from "react-icons/hi";
import { HiUser } from "react-icons/hi2";
import MenuLink from "./MenuLink";
import LogoutButton from "./LogoutButton";

import useLoginModal from "../hooks/useLoginModal";
import useSignupModal from "../hooks/useSignupModal";

interface UserNavProps {
  userId?: string | null;
}

const UserNav: React.FC<UserNavProps> = ({ userId }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const signupModal = useSignupModal();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='h-8 w-[90px] relative flex items-center justify-center rounded-full shadow-2xl  bg-white-main'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center justify-between gap-2 text-purple-950'
      >
        <span className='text-[14px] font-extrabold'>Log-in</span>
        <span className='rounded-full bg-gray-300 p-1'>
          <HiUser />
        </span>
      </button>

      {isOpen && (
        <div className='w-[220px] absolute top-[40px] -left-10 bg-white border rounded-xl shadow-md flex flex-col cursor-pointer'>
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
