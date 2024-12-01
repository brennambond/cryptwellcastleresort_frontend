"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { headerLinks } from "../constants";

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <div className='flex h-full flex-col lg:flex-row text-white-main'>
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link
            key={link.route}
            href={link.route}
            className={`${
              isActive && "text-[#6c53a4]  "
            } px-[1rem] flex items-center justify-center cursor-pointer transition-colors h-full link-hover`}
          >
            <span className='p-bold-18'>{link.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinks;
