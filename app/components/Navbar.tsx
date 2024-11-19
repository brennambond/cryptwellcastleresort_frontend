import Image from "next/image";
import Link from "next/link";
import SearchFilters from "./SearchFilters";
import UserNav from "./UserNav";
import { GiMagnifyingGlass } from "react-icons/gi";

import { getUserId } from "../lib/actions";

const Navbar = async () => {
  const userId = await getUserId();
  return (
    <main className='relative top-0 left-0 max-w-[100vw] z-[100]'>
      <div className='flex flex-col items-center justify-center relative top-0 w-full z-1  bg-[#4ea0ae]  flex-shrink-0'>
        <div className='w-full mx-auto flex items-center justify-between pt-2 px-8 align-bottom'>
          <div className='min-h-[50px] w-[43%]' />
          <div className='flex-grow flex min-h-[50px] items-center justify-center'>
            <Link href='/' className='w-20'>
              <Image
                src='/company-logo.png'
                alt='Haunted Hotel logo'
                width={1000}
                height={1000}
              />
            </Link>
          </div>
          <div className='min-h-[50px] w-[43%]'>
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
          </div>
        </div>
        <nav className='w-full h-14 flex justify-center items-center align-bottom'>
          <div className='flex flex-col items-center z-1 top-0 relative w-full'>
            <div className='flex justify-between items-center'>
              <Link href='/rooms'>Rooms</Link>
              <Link href='/rooms/wings'>Wings</Link>
              {/* <SearchFilters /> */}
            </div>
          </div>
        </nav>
      </div>
    </main>
  );
};

export default Navbar;
