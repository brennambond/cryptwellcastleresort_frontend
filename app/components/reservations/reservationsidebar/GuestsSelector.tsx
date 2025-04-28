"use client";

import CustomDropdown from "../../CustomDropdown";

interface GuestsSelectorProps {
  guests: string;
  onChange: (value: string) => void;
  guestsRange: string[];
  backgroundColorStyle: string;
  className?: string;
}

const GuestsSelector: React.FC<GuestsSelectorProps> = ({
  guests,
  onChange,
  guestsRange,
  backgroundColorStyle,
  className,
}) => (
  <div className='border border-gray-300 rounded-md shadow-md'>
    <label
      className={`${backgroundColorStyle} ${className} block w-full p-bold-20 py-1 rounded-t-md tracking-wider border-b border-gray-400`}
    >
      Guests
    </label>
    <CustomDropdown
      value={guests}
      options={guestsRange}
      onChange={onChange}
      dropdownColorStyle={backgroundColorStyle}
    />
  </div>
);

export default GuestsSelector;
