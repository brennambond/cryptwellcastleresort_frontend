"use client";

import { HiOutlineSearch } from "react-icons/hi";
import useSearchModal from "../hooks/useSearchModal";

const SearchFilters = () => {
  const searchModal = useSearchModal();
  return (
    <div
      onClick={() => searchModal.open("checkin")}
      className='h-12 lg:h-16 flex flex-row items-center justify-between border rounded-full bg-white-main'
    >
      {/* <div className='hidden lg:block'>
        <div className='flex flex-row items-center justify-between'>
          <div className='cursor-pointer w-[250px] h-12 lg:h-16 px-8 flex flex-col rounded-full hover:bg-gray-100 justify-center'>
            <p className='text-xs font-semibold'>Where</p>
            <p className='text-sm'>Wanted Location</p>
          </div>
          <div className='cursor-pointer h-12 lg:h-16 px-8 flex flex-col rounded-full hover:bg-gray-100 justify-center'>
            <p className='text-xs font-semibold'>Check In</p>
            <p className='text-sm'>Add Dates</p>
          </div>
          <div className='cursor-pointer h-12 lg:h-16 px-8 flex flex-col rounded-full hover:bg-gray-100 justify-center'>
            <p className='text-xs font-semibold'>Check Out</p>
            <p className='text-sm'>Add Dates</p>
          </div>
          <div className='cursor-pointer h-12 lg:h-16 px-8 flex flex-col rounded-full hover:bg-gray-100 justify-center'>
            <p className='text-xs font-semibold'>Who</p>
            <p className='text-sm'>Add Guests</p>
          </div>
        </div>
      </div> */}
      <div className='p-2'>
        <div className='cursor-pointer p-2 lg:p-4 bg-purple-main rounded-full text-white  transition-colors'>
          <HiOutlineSearch className='w-5 h-5' />
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
