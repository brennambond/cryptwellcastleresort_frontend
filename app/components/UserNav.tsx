"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { HiMenu, HiOutlineUser } from "react-icons/hi";
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
    <div className='p-2 relative inline-block border rounded-full bg-white-main'>
      <button onClick={() => setIsOpen(!isOpen)} className='flex items-center'>
        <HiMenu />
        <HiOutlineUser />
      </button>

      {isOpen && (
        <div className='w-[220px] absolute top-[60px] right-0 bg-white border rounded-xl shadow-md flex flex-col cursor-pointer'>
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
