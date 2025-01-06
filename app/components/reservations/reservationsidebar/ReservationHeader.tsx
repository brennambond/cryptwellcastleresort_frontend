interface ReservationHeaderProps {
  backgroundColorStyle: string;
}

const ReservationHeader: React.FC<ReservationHeaderProps> = ({
  backgroundColorStyle,
}) => (
  <header
    className={`flex-center py-4 rounded-t-xl w-full border-b border-gray-400 ${backgroundColorStyle}`}
  >
    <h2 className='p-medium-28 tracking-wider font-germania'>Book Your Stay</h2>
  </header>
);

export default ReservationHeader;
