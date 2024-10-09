"use client";

import { useState } from "react";

import { HiMenu, HiOutlineUser } from "react-icons/hi";
import MenuLink from "./MenuLink";

const UserNav = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className='p-2 relative inline-block border rounded-full'>
      <button className='flex items-center'>
        <HiMenu />
        <HiOutlineUser />
      </button>

      {isOpen && (
        <div className='w-[220px] absolute top-[60px] right-0 bg-white border rounded-xl shadow-md flex flex-col cursor-pointer'>
          <MenuLink
            label='Log in'
            onClick={() => console.log("Clicked Button")}
          />
          <MenuLink
            label='Sign up'
            onClick={() => console.log("Clicked Button")}
          />
        </div>
      )}
    </div>
  );
};

export default UserNav;
