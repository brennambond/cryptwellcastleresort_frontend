import { useState } from "react";

export interface SearchQuery {
  // Export SearchQuery for use in other files
  wing?: string;
  guests?: number;
  beds?: number;
  bedrooms?: number;
  bathrooms?: number;
  checkIn?: Date;
  checkOut?: Date;
  category?: string;
}

interface ModalState {
  isOpen: boolean;
  field?: keyof SearchQuery;
}

const useSearchModal = () => {
  const [query, setQuery] = useState<SearchQuery>({});
  const [modalState, setModalState] = useState<ModalState>({ isOpen: false });

  const updateQuery = (key: keyof SearchQuery, value: any) => {
    setQuery((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetQuery = () => {
    setQuery({});
  };

  const open = (field: keyof SearchQuery) => {
    setModalState({ isOpen: true, field });
  };

  const close = () => {
    setModalState({ isOpen: false });
  };

  return {
    query,
    updateQuery,
    resetQuery,
    open,
    close,
    modalState, // Provide access to the current modal state
  };
};

export default useSearchModal;
