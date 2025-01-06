"use client";

import { Listbox } from "@headlessui/react";
import React from "react";

interface CustomDropdownProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  dropdownColorStyle: string; // Dynamic color styling for hover
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  value,
  options,
  onChange,
  dropdownColorStyle,
}) => {
  return (
    <div className='relative w-full text-black'>
      <Listbox value={value} onChange={onChange}>
        <Listbox.Button className='w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-b-md focus:outline-none focus:ring-1 focus:ring-gray-400 '>
          {value}
        </Listbox.Button>
        <Listbox.Options className='absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10'>
          {options.map((option) => (
            <Listbox.Option
              key={option}
              value={option}
              className={({ active }) =>
                `cursor-pointer select-none relative py-2 pl-3 pr-4 rounded-md ${
                  active ? `${dropdownColorStyle} text-white` : "text-black"
                }`
              }
            >
              {option}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};

export default CustomDropdown;
