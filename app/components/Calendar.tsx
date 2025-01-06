"use client";

import { DateRange, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface CalendarProps {
  value: Range;
  onChange: (ranges: any) => void;
  bookedDates: Date[];
  backgroundColorStyle?: string;
}

const tailwindToHexMap: Record<string, string> = {
  "bg-red-900": "#7f1d1d",
  "bg-cyan-900": "#164e63",
  "bg-emerald-900": "#064e3b",
  "bg-fuchsia-950": "#701a75",
};

const Calendar: React.FC<CalendarProps> = ({
  value,
  onChange,
  bookedDates,
  backgroundColorStyle,
}) => {
  const disabledDates = bookedDates.map((date) => {
    const [year, month, day] = date.toISOString().split("T")[0].split("-");
    return new Date(Number(year), Number(month) - 1, Number(day));
  });

  const dynamicColor = backgroundColorStyle
    ? tailwindToHexMap[backgroundColorStyle] || "#000"
    : "#000";

  return (
    <DateRange
      ranges={[value]}
      onChange={onChange}
      minDate={new Date()}
      disabledDates={disabledDates}
      rangeColors={[dynamicColor]}
      direction='vertical'
      showDateDisplay={false}
      className={`w-[90%] lg:w-[80%] xl:w-[60%] border border-gray-400 rounded-xl mb-4 flex-center flex-col `}
    />
  );
};

export default Calendar;
