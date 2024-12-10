"use client";

import { useState } from "react";
import useSearchModal, { SearchQuery } from "../../hooks/useSearchModal";
import Modal from "../Modal";
import { Range } from "react-date-range";
import DatePicker from "../Calendar";
import CustomButton from "../CustomButton";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const SearchModal = () => {
  let content = <></>;
  const searchModal = useSearchModal();
  const [numGuests, setNumGuests] = useState<string>("1");
  const [numBeds, setNumBeds] = useState<string>("0");
  const [numBedrooms, setNumBedrooms] = useState<string>("0");
  const [numBathrooms, setNumBathrooms] = useState<string>("0");
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const closeAndSearch = () => {
    const newSearchQuery: SearchQuery = {
      wing: "",
      checkIn: dateRange.startDate,
      checkOut: dateRange.endDate,
      guests: parseInt(numGuests),
      beds: parseInt(numBeds),
      bedrooms: parseInt(numBedrooms),
      bathrooms: parseInt(numBathrooms),
      category: "",
    };
    searchModal.setQuery(newSearchQuery);
    searchModal.close();
    console.log(newSearchQuery);
  };

  const _setDateRange = (selection: Range) => {
    if (searchModal.step === "checkin") {
      searchModal.open("checkout");
    } else if (searchModal.step === "checkout") {
      searchModal.open("details");
    }
    setDateRange(selection);
  };

  const contentCheckin = (
    <div className='flex flex-col '>
      <h2 className='mb-6 text-2xl self-center'>
        When would you like to check in?
      </h2>

      <div className='flex-center'>
        <DatePicker
          value={dateRange}
          onChange={(value) => _setDateRange(value.selection)}
        />
      </div>

      <div className='mt-6 flex w-[50%] self-center'>
        <CustomButton
          className='button-main'
          label='Continue to Check Out Date'
          onClick={() => searchModal.open("checkout")}
        />
      </div>
    </div>
  );

  const contentCheckout = (
    <div className='flex flex-col '>
      <h2 className='mb-6 text-2xl self-center'>
        When would you like to check out?
      </h2>

      <div className='flex-center'>
        <DatePicker
          value={dateRange}
          onChange={(value) => _setDateRange(value.selection)}
        />
      </div>

      <div className='mt-6 flex flex-row gap-4'>
        <CustomButton
          className='button-main'
          label='Back to Check In Date'
          onClick={() => searchModal.open("checkin")}
        />
        <CustomButton
          className='button-main'
          label='Continue to Booking Details'
          onClick={() => searchModal.open("details")}
        />
      </div>
    </div>
  );

  const contentDetails = (
    <>
      <h2 className='mb-6 text-2xl'>Give us the details of your visit:</h2>

      <div className='space-y-4'>
        <div className='space-y-4'>
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

        <div className='space-y-4'>
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

        <div className='space-y-4'>
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

        <div className='space-y-4'>
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
          className='button-main'
          label='Back to Check Out Date'
          onClick={() => searchModal.open("checkout")}
        />
        <CustomButton
          className='button-main'
          label='Search for Available Rooms'
          onClick={closeAndSearch}
        />
      </div>
    </>
  );

  if (searchModal.step == "checkin") {
    content = contentCheckin;
  } else if (searchModal.step == "checkout") {
    content = contentCheckout;
  } else if (searchModal.step == "details") {
    content = contentDetails;
  }

  return (
    <Modal
      label='Search'
      content={content}
      close={searchModal.close}
      isOpen={searchModal.isOpen}
    />
  );
};

export default SearchModal;
