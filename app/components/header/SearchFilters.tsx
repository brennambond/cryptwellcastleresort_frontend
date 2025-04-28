import React from "react";
import { motion } from "framer-motion";

interface SearchFiltersProps {
  setIsSearchModalOpen: (isOpen: boolean) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  setIsSearchModalOpen,
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      onClick={() => {
        setIsSearchModalOpen(true);
      }}
      className='p-bold-18 md:p-bold-20 xl:max-w-[90%] cursor-pointer underline transition-colors hover:text-purple-500'
    >
      Search Now:
    </motion.button>
  );
};

export default SearchFilters;
