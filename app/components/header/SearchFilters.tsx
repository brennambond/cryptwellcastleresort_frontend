"use client";

import useSearchModal from "../../hooks/useSearchModal";
import { PiMagnifyingGlassDuotone } from "react-icons/pi";

const SearchFilters = () => {
  const searchModal = useSearchModal();
  return (
    <span
      onClick={() => searchModal.open("checkin")}
      className='p-bold-18 md:p-bold-20 xl:max-w-[90%] cursor-pointer underline transition-colors hover:text-purple-500 '
    >
      Search Now:
    </span>
  );
};

export default SearchFilters;
