"use client";

import { useState } from "react";
import useSearchModal from "../../hooks/useSearchModal";
import Modal from "../Modal";
import { Range } from "react-date-range";
import DatePicker from "../Calendar";
import CustomButton from "../CustomButton";

const initialDateRange: Range = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface SearchModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  setFilteredRooms: (query: any) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onRequestClose,
  setFilteredRooms,
}) => {
  const searchModal = useSearchModal();
  const [numGuests, setNumGuests] = useState<string>("1");
  const [numBeds, setNumBeds] = useState<string>("0");
  const [numBedrooms, setNumBedrooms] = useState<string>("0");
  const [numBathrooms, setNumBathrooms] = useState<string>("0");
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const closeAndSearch = () => {
    const newSearchQuery = {
      guests: parseInt(numGuests),
      beds: parseInt(numBeds),
      bedrooms: parseInt(numBedrooms),
      bathrooms: parseInt(numBathrooms),
      checkIn: dateRange.startDate,
      checkOut: dateRange.endDate,
    };

    console.log("Updating search query:", newSearchQuery);

    setFilteredRooms(newSearchQuery);
    console.log("Closing modal after applying filters");
    onRequestClose(); // Close the modal properly
  };

  const _setDateRange = (selection: Range) => {
    setDateRange(selection);
    if (searchModal.step === "checkin") {
      searchModal.open("checkout");
    } else if (searchModal.step === "checkout") {
      searchModal.open("details");
    }
  };

  const contentMap = {
    checkin: (
      <div className='flex-center flex-col'>
        <h2 className='mb-6 text-2xl self-center'>
          When would you like to check in?
        </h2>
        <DatePicker
          value={dateRange}
          onChange={(value) => _setDateRange(value.selection)}
          bookedDates={[]} // Replace with actual booked dates
        />
        <CustomButton
          className='button-main'
          label='Continue to Check Out Date'
          onClick={() => searchModal.open("checkout")}
        />
      </div>
    ),
    checkout: (
      <div className='flex-center flex-col'>
        <h2 className='mb-6 text-2xl self-center'>
          When would you like to check out?
        </h2>
        <DatePicker
          value={dateRange}
          onChange={(value) => _setDateRange(value.selection)}
          bookedDates={[]} // Replace with actual booked dates
        />
        <div className='mt-6 flex flex-row gap-4 w-full'>
          <CustomButton
            className='button-main-secondary'
            label='Back to Check In Date'
            onClick={() => searchModal.open("checkin")}
          />
          <CustomButton
            className='button-main-secondary'
            label='Continue to Booking Details'
            onClick={() => searchModal.open("details")}
          />
        </div>
      </div>
    ),
    details: (
      <>
        <h2 className='mb-6 text-2xl self-center'>
          Give us the details of your visit:
        </h2>
        <div className='space-y-4'>
          <div>
            <label>Number of guests (max of 8):</label>
            <input
              type='number'
              min='1'
              max='8'
              value={numGuests}
              placeholder='Number of guests...'
              onChange={(e) => setNumGuests(e.target.value)}
              className='w-full h-14 px-4 border border-gray-300 rounded-xl'
            />
          </div>

          <div>
            <label>Number of beds (max of 3):</label>
            <input
              type='number'
              min='1'
              max='3'
              value={numBeds}
              placeholder='Number of beds...'
              onChange={(e) => setNumBeds(e.target.value)}
              className='w-full h-14 px-4 border border-gray-300 rounded-xl'
            />
          </div>

          <div>
            <label>Number of bedrooms (max of 2):</label>
            <input
              type='number'
              min='1'
              max='2'
              value={numBedrooms}
              placeholder='Number of bedrooms...'
              onChange={(e) => setNumBedrooms(e.target.value)}
              className='w-full h-14 px-4 border border-gray-300 rounded-xl'
            />
          </div>

          <div>
            <label>Number of bathrooms (max of 2):</label>
            <input
              type='number'
              min='1'
              max='2'
              value={numBathrooms}
              placeholder='Number of bathrooms...'
              onChange={(e) => setNumBathrooms(e.target.value)}
              className='w-full h-14 px-4 border border-gray-300 rounded-xl'
            />
          </div>
        </div>

        <div className='mt-6 flex flex-row gap-4'>
          <CustomButton
            className='button-main-secondary'
            label='Back to Check Out Date'
            onClick={() => searchModal.open("checkout")}
          />
          <CustomButton
            className='button-main-secondary'
            label='Apply Filters'
            onClick={closeAndSearch}
          />
        </div>
      </>
    ),
  };

  const selectedContent = contentMap[searchModal.step];

  return (
    <Modal
      label='Search'
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      content={selectedContent}
    />
  );
};

export default SearchModal;
