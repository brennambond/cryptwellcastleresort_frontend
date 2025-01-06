interface PricingDetailsProps {
  nights: number;
  chamberPrice: number;
  fee: number;
  totalPrice: number;
  backgroundColorStyle: string;
}

const PricingDetails: React.FC<PricingDetailsProps> = ({
  nights,
  chamberPrice,
  fee,
  totalPrice,
  backgroundColorStyle,
}) => (
  <div className='border border-gray-300 rounded-md shadow-md'>
    <label
      className={`${backgroundColorStyle} block w-full p-bold-20 py-1 rounded-t-md tracking-wider border-b border-gray-400`}
    >
      Pricing Details
    </label>
    <div className='p-4 space-y-2 text-black'>
      <div className='flex justify-between'>
        <p>
          Chamber Price x {nights} {nights > 1 ? "nights" : "night"}:
        </p>
        <p className='font-bold'>${chamberPrice}</p>
      </div>
      <div className='flex justify-between'>
        <p>Resort Fee (5%):</p>
        <p className='font-bold'>${fee.toFixed(2)}</p>
      </div>
      <div className='flex justify-between bg-gray-100 p-4 rounded-md mt-4'>
        <p className='text-lg font-bold'>Total Cost:</p>
        <p className='text-lg font-bold'>${totalPrice.toFixed(2)}</p>
      </div>
    </div>
  </div>
);

export default PricingDetails;
