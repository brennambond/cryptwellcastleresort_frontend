"use client";

import { DateRange, Range, RangeKeyDict } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface DatePickerProps {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  bookedDates?: Date[];
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  bookedDates,
}) => {
  return (
    <DateRange
      className='w-[90%] lg:w-[80%] xl:w-[60%] border border-gray-400 rounded-xl mb-4 flex-center flex-col '
      rangeColors={["#1f2937"]}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction='vertical'
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={bookedDates}
    />
  );
};

export default DatePicker;
