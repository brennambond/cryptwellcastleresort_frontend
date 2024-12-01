"use client";

import useSearchModal from "../hooks/useSearchModal";
import { PiMagnifyingGlassDuotone } from "react-icons/pi";

const SearchFilters = () => {
  const searchModal = useSearchModal();
  return (
    <div onClick={() => searchModal.open("checkin")} className='flex'>
      <div className='items-stretch flex'>
        <div className='px-[0.8125rem] flex items-center justify-center'>
          <div className='flex items-center justify-center text-[#dadada] px-[0.3125rem]'>
            <PiMagnifyingGlassDuotone className='w-[1.75rem] h-[1.75rem] sm:h-[2rem] sm:w-[2rem] md:h-[2.25rem] md:w-[2.25rem] overflow-hidden' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
