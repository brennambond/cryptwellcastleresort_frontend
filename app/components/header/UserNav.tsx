"use client";

import React, { useState, useEffect, useRef } from "react";
import { HiUser } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";
import useSignupModal from "@/app/hooks/useSignupModal";
import MenuLink from "./MenuLink";
import LogoutModal from "./LogoutModal";
import { getCurrentUser } from "../../lib/actions";

const UserNav: React.FC = () => {
  const loginModal = useLoginModal();
  const signupModal = useSignupModal();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.reload();
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setUserId(user?.id || null); // Safely handle null user
      } catch (error) {
        console.error("Error fetching user:", error);
        setUserId(null);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={navRef}
      className='h-8 relative flex items-center justify-center rounded-full shadow-2xl'
    >
      <button
        onClick={toggleMenu}
        className='flex items-center justify-between gap-2 text-purple-950'
      >
        <span className='rounded-full bg-white-main h-10 w-10 sm:w-[52px] sm:h-[52px] flex-center'>
          <HiUser className='w-6 h-6 sm:w-8 sm:h-8 xl:h-8 xl:w-8' />
        </span>
      </button>

      {isOpen && (
        <div className='w-[120px] sm:w-[160px] xl:w-[200px] absolute top-[40px] -right-2 md:-right-6 xl:-right-4 bg-white border border-gray-200 rounded-xl shadow-2xl flex flex-col cursor-pointer z-[99] text-wrap text-center font-bold'>
          {userId ? (
            <>
              <MenuLink
                className='px-5 py-4 cursor-pointer hover:bg-white-main transition rounded-t-xl text-purple-main border-b border-gray-200'
                label='My Reservations'
                onClick={() => {
                  closeMenu?.();
                  router.push("/myreservations");
                }}
              />
              <MenuLink
                className='px-5 py-4 cursor-pointer hover:bg-white-main transition rounded-b-xl text-purple-main'
                label='Log out'
                onClick={() => setIsLogoutModalOpen(true)}
              />
            </>
          ) : (
            <>
              <MenuLink
                className='px-5 py-4 cursor-pointer hover:bg-white-main transition rounded-t-xl text-purple-main border-b border-gray-200'
                label='Log in'
                onClick={() => {
                  closeMenu?.();
                  loginModal.open();
                }}
              />
              <MenuLink
                className='px-5 py-4 cursor-pointer hover:bg-white-main transition rounded-b-xl text-purple-main'
                label='Sign up'
                onClick={() => {
                  closeMenu?.();
                  signupModal.open();
                }}
              />
            </>
          )}
        </div>
      )}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default UserNav;
