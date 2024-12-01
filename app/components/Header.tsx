import Image from "next/image";
import Link from "next/link";

import { GiMagnifyingGlass, GiHamburgerMenu } from "react-icons/gi";

import UserNav from "./UserNav";
import SearchFilters from "./SearchFilters";

import { getUserId } from "../lib/actions";
import NavLinks from "./NavLinks";
import MobileNav from "./MobileNav";

const Header = async () => {
  const userId = await getUserId();

  console.log("userId: ", userId);
  return (
    <header className=' bg-[#4ea0ae] font-cormorant w-full'>
      <div className='mini-wrapper flex-between h-full'>
        <div id='header-right' className='flex-between h-full'>
          <div className='px-3 flex-center link-hover h-full'>
            <MobileNav />
          </div>
          <Link
            href='/'
            className='w-20 md:w-[88px] lg:w-24 px-[1.125rem] py-2'
          >
            <Image
              src='/hotel-logo-main.png'
              alt='Haunted Hotel logo'
              width={1000}
              height={1000}
            />
          </Link>
        </div>

        <div id='header-links' className='hidden lg:flex-between w-full h-full'>
          <NavLinks />
        </div>

        <div
          id='header-left'
          className='flex w-32 items-center justify-end lg:gap-3 h-full'
        >
          <div className='flex items-center justify-center cursor-pointer link-hover h-full'>
            <div className='flex items-center justify-center text-[#dadada] px-[0.3125rem]'>
              <SearchFilters />
            </div>
          </div>

          <div className='px-3 lg:px-[0.8125rem] flex items-center justify-center cursor-pointer link-hover h-full'>
            <div className='flex items-center justify-center text-[#dadada] px-[0.3125rem]'>
              <UserNav userId={userId} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;