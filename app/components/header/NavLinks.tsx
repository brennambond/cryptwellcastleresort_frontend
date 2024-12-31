"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { headerLinks } from "../../constants";

interface NavLinksProps {
  closeOnClick?: boolean | (() => void); // Allow boolean or function
}

const NavLinks: React.FC<NavLinksProps> = ({ closeOnClick = false }) => {
  const pathname = usePathname();

  return (
    <div className='flex w-full lg:h-full flex-col lg:flex-row text-white-main gap-12 lg:gap-0 pr-4 lg:pr-0 pt-4 lg:pt-0'>
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <Link
            key={link.route}
            href={link.route}
            className={`${
              isActive && "text-purple-500 "
            } lg:px-[1rem] flex-center whitespace-nowrap cursor-pointer transition-colors h-full link-hover-secondary lg:link-hover`}
            onClick={() => {
              if (typeof closeOnClick === "function") closeOnClick();
            }}
          >
            <span className='p-bold-18'>{link.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinks;
