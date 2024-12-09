import { create } from "zustand";

export type SearchQuery = {
  wing: string | undefined;
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  guests: Number;
  beds: Number;
  bedrooms: Number;
  bathrooms: Number;
  category: String | undefined;
};

interface SearchModalStore {
  isOpen: boolean;
  step: string;
  open: (step: string) => void;
  close: () => void;
  query: SearchQuery;
  setQuery: (query: SearchQuery) => void;
}

const useSearchModal = create<SearchModalStore>((set) => ({
  isOpen: false,
  step: "",
  open: (step) => set({ isOpen: true, step: step }),
  close: () => set({ isOpen: false }),
  setQuery: (query: SearchQuery) => set({ query: query }),
  query: {
    wing: "",
    checkIn: undefined,
    checkOut: undefined,
    guests: 1,
    beds: 0,
    bedrooms: 0,
    bathrooms: 0,
    category: "",
  },
}));

export default useSearchModal;
