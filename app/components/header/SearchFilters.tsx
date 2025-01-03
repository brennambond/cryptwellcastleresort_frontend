import React from "react";
import { motion } from "framer-motion";

interface SearchFiltersProps {
  setIsSearchModalOpen: (isOpen: boolean) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  setIsSearchModalOpen,
}) => {
  return (
    <motion.span
      whileHover={{ scale: 1.1 }}
      onClick={() => {
        console.log("Opening SearchModal");
        setIsSearchModalOpen(true);
      }}
      className='p-bold-18 md:p-bold-20 xl:max-w-[90%] cursor-pointer underline transition-colors hover:text-purple-500'
    >
      Search Now:
    </motion.span>
  );
};

export default SearchFilters;
