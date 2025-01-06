import CustomDropdown from "../../CustomDropdown";

interface GuestsSelectorProps {
  guests: string;
  guestsRange: string[];
  onChange: (value: string) => void;
  backgroundColorStyle: string;
}

const GuestsSelector: React.FC<GuestsSelectorProps> = ({
  guests,
  guestsRange,
  onChange,
  backgroundColorStyle,
}) => (
  <div className='border border-gray-300 rounded-md shadow-md'>
    <label
      className={`${backgroundColorStyle} block w-full p-bold-20 py-1 rounded-t-md tracking-wider border-b border-gray-400`}
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
