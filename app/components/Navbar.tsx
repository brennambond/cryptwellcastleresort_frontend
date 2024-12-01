import Image from "next/image";
import Link from "next/link";
import SearchFilters from "./SearchFilters";
import UserNav from "./UserNav";
import { GiMagnifyingGlass, GiHamburgerMenu } from "react-icons/gi";

import { getUserId } from "../lib/actions";
import SearchModal from "./SearchModal";

const Navbar = async () => {
  const userId = await getUserId();
  return (
    <header className='flex flex-col items-center h-auto justify-cneter relative top-0 left-0 w-full z-[98] bg-[#4ea0ae] font-cormorant'>
      <div
        id='header-wrapper'
        className='w-full flex lg:flex-col items-center justify-center flex-shrink-0 px-4 lg:px-0 z-[1]'
      >
        <div
          id='header-top'
          className='min-w-[100%] min-h-[100%] lg:min-h-min w-full '
        >
          <div
            id='top-nav'
            className='flex w-full justify-between items-center'
          >
            <div id='top-nav-left'>
              <div className='hidden lg:flex lg:min-h-[50px] lg:w-[43%]'></div>
              <button className='lg:hidden flex flex-col text-purple-950 text-[11px] items-center justify-center font-bold tracking-[0.5px] cursor-pointer w-auto h-auto min-h-[30px]'>
                <span className='text-[24px] leading-[18px]'>
                  <GiHamburgerMenu />
                </span>
                <span className='text-[14px] font-bold'>Menu</span>
              </button>
            </div>

            <div id='top-nav-middle'>
              <div className='mini-wrapper flex flex-grow lg:min-h-[50px] items-center justify-center'>
                <Link href='/' className='w-[52px] lg:w-[72px]'>
                  <Image
                    src='/company-logo.png'
                    alt='Haunted Hotel logo'
                    width={1000}
                    height={1000}
                  />
                </Link>
              </div>
            </div>

            <div id='top-nav-right' className='flex mr-6'>
              <div className='hidden lg:flex lg:min-h-[50px] lg:w-[43%] '>
                <div className='flex items-center justify-end ml-auto leading-[12px] h-full text-right'>
                  <ul className='flex items-center justify-center gap-4'>
                    <li className='h-8 w-8 flex items-center justify-center bg-white-main shadow-primary rounded-full p-2'>
                      <button className='w-6 h-6 flex items-center justify-center text-purple-950 cursor-pointer'>
                        <GiMagnifyingGlass />
                      </button>
                    </li>
                    {/* <li className='h-8 w-20 flex gap-2 items-center justify-center bg-white-main shadow-primary rounded-full p-2'>
                      <GiMagnifyingGlass />
                      <span className='text-[11px]'>Sign in</span>
                    </li> */}
                    <li>
                      <UserNav userId={userId} />
                    </li>
                  </ul>
                </div>
              </div>
              <GiMagnifyingGlass className='lg:hidden w-10 h-10 text-purple-950' />
            </div>
          </div>
        </div>

        <nav id='navigation' className='hidden lg:flex'>
          <div className='mini-wrapper hidden lg:flex items-center justify-center '>
            <Link href='/rooms' className='p-bold-20 text-white-main'>
              Rooms
            </Link>
            <Link href='/rooms/wings' className='p-bold-20 text-white-main'>
              Wings
            </Link>
          </div>
        </nav>
      </div>

      {/* <div className='min-h-[50px] w-[43%]'>
            <div className='flex items-center justify-end ml-auto'>
              <ul className='flex align-bottom items-center justify-center gap-2'>
                <li>
                  <UserNav userId={userId} />
                </li>
                <li className='h-8 w-8 flex items-center justify-center mr-[10px] rounded-lg shadow-2xl shadow-black '>
                  <GiMagnifyingGlass className='text-white-main' />
                </li>
              </ul>
            </div>
          </div> */}

      {/* <nav className='w-full h-14 flex justify-center items-center align-bottom'>
          <div className='flex flex-col items-center z-1 top-0 relative w-full'>
            <div className='flex justify-between items-center'>
              <Link href='/rooms'>Rooms</Link>
              <Link href='/rooms/wings'>Wings</Link>
              <SearchFilters />
            </div>
          </div>
        </nav> */}
    </header>
  );
};

export default Navbar;
