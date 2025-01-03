"use client";

import { useState } from "react";

export interface SearchQuery {
  wing: string;
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  beds: number;
  bedrooms: number;
  bathrooms: number;
  category: string;
}

interface ModalState {
  isOpen: boolean;
  step: "checkin" | "checkout" | "details";
}

const useSearchModal = () => {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    step: "checkin",
  });

  const [query, setQuery] = useState<SearchQuery>({
    wing: "",
    checkIn: null,
    checkOut: null,
    guests: 1,
    beds: 0,
    bedrooms: 0,
    bathrooms: 0,
    category: "",
  });

  const open = (step: ModalState["step"]) => {
    setModalState({ isOpen: true, step });
    console.log("Modal state after open:", { isOpen: true, step });
  };

  const close = () => setModalState({ isOpen: false, step: "checkin" });

  const updateQuery = (newQuery: Partial<SearchQuery>) =>
    setQuery((prev) => ({ ...prev, ...newQuery }));

  return {
    isOpen: modalState.isOpen,
    step: modalState.step,
    query,
    open,
    close,
    setQuery: updateQuery,
  };
};

export default useSearchModal;
