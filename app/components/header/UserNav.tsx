"use client";

import React, { useState, useEffect } from "react";
import { HiUser } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";
import useSignupModal from "@/app/hooks/useSignupModal";
import MenuLink from "./MenuLink";
import LogoutButton from "./LogoutButton";
import { getCurrentUser } from "../../lib/actions";

interface UserNavProps {
  userId: string | null;
}

const UserNav: React.FC = () => {
  const loginModal = useLoginModal();
  const signupModal = useSignupModal();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser(); // Use actions.ts function
        setUserId(user.id); // Update state with user ID from backend
      } catch (error) {
        console.error("Error fetching user:", error);
        setUserId(null); // Clear user state if backend validation fails
      }
    };

    fetchUser();
  }, []);

  // Optional: Listen to storage events to detect logout/login from other tabs
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUserId = localStorage.getItem("user_id");
      setUserId(storedUserId);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className='h-8 relative flex items-center justify-center rounded-full shadow-2xl'>
      <button
        onClick={toggleMenu}
        className='flex items-center justify-between gap-2 text-purple-950'
      >
        <span className='rounded-full bg-white-main h-10 w-10 md:h-11 md:w-11 xl:h-12 xl:w-12 flex-center'>
          <HiUser className='w-6 h-6 md:w-7 md:h-7 xl:h-8 xl:w-8' />
        </span>
      </button>

      {isOpen && (
        <div className='w-[120px] sm:w-[160px] xl:w-[200px] absolute top-[40px] -right-2 md:-right-6 xl:-right-4 bg-white border rounded-xl shadow-md flex flex-col cursor-pointer z-[99]'>
          {userId ? (
            <>
              <MenuLink
                className='px-5 py-4 cursor-pointer hover:bg-gray-100 transition rounded-xl text-purple-main'
                label='My Reservations'
                onClick={() => {
                  closeMenu?.();
                  router.push("/myreservations");
                }}
              />
              <LogoutButton
                closeMenu={closeMenu}
                onClick={() => {
                  router.refresh();
                }}
              />
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  closeMenu?.();
                  loginModal.open();
                }}
                className='px-5 py-4 cursor-pointer hover:bg-gray-100 transition rounded-xl text-purple-main'
              >
                Log in
              </button>
              <button
                onClick={() => {
                  closeMenu?.();
                  signupModal.open();
                }}
                className='px-5 py-4 cursor-pointer hover:bg-gray-100 transition rounded-xl text-purple-main'
              >
                Sign up
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserNav;
