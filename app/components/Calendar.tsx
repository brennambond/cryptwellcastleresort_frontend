"use client";

import { DateRange, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface DatePickerProps {
  value: Range;
  onChange: (ranges: any) => void;
  bookedDates: Date[];
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  bookedDates,
}) => {
  const disabledDates = bookedDates.map((date) => {
    const [year, month, day] = date.toISOString().split("T")[0].split("-");
    return new Date(Number(year), Number(month) - 1, Number(day)); // Local date
  });

  return (
    <DateRange
      ranges={[value]}
      onChange={onChange}
      minDate={new Date()}
      disabledDates={disabledDates}
      rangeColors={["#1f2937"]}
      direction='vertical'
      showDateDisplay={true}
      className='w-[90%] lg:w-[80%] xl:w-[60%] border border-gray-400 rounded-xl mb-4 flex-center flex-col'
    />
  );
};

export default DatePicker;
