import Image from "next/image";
import Link from "next/link";
import SearchFilters from "./SearchFilters";
import UserNav from "./UserNav";

import { getUserId } from "../lib/actions";

const Navbar = async () => {
  const userId = await getUserId();
  return (
    <nav className='w-full fixed top-0 left-0 py-6 border-b  z-50 bg-[#4ea0ae]'>
      <div className='max-w-[1500px] mx-auto px-6'>
        <div className='flex justify-between items-center'>
          <Link href='/'>
            <Image
              src='/hotel-logo-main.png'
              alt='Haunted Hotel logo'
              width={60}
              height={38}
            />
          </Link>
          <Link href='/rooms'>Rooms</Link>
          <Link href='/rooms/wings'>Wings</Link>
          <SearchFilters />

          {/* <div className='flex space-x-6'>
            <SearchFilters />
          </div> */}
          <div className='flex items-center space-x-6'>
            <UserNav userId={userId} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
