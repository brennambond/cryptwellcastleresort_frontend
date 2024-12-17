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
  bookedDates = [],
}) => {
  return (
    <DateRange
      ranges={[value]}
      onChange={onChange}
      minDate={new Date()}
      disabledDates={bookedDates}
      rangeColors={["#1f2937"]}
      direction='vertical'
      showDateDisplay={false}
      className='w-full border rounded'
    />
  );
};

export default DatePicker;
