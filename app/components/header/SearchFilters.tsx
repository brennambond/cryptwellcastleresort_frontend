"use client";

import { motion } from "framer-motion";
import useSearchModal, { SearchQuery } from "../../hooks/useSearchModal";

interface SearchFiltersProps {
  defaultField?: keyof SearchQuery; // Update the type to match keyof SearchQuery
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  defaultField = "checkIn",
}) => {
  const searchModal = useSearchModal();

  return (
    <motion.span
      whileHover={{ scale: 1.1 }}
      onClick={() => searchModal.open(defaultField)}
      className='p-bold-18 md:p-bold-20 xl:max-w-[90%] cursor-pointer underline transition-colors hover:text-purple-500'
    >
      Search Now:
    </motion.span>
  );
};

export default SearchFilters;
