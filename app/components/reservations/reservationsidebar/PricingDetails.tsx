"use client";

interface PricingDetailsProps {
  nights: number;
  chamberPrice: number;
  fee: string;
  subtotal: string;
  totalPrice: number;
  backgroundColorStyle?: string;
  className?: string;
}

const PricingDetails: React.FC<PricingDetailsProps> = ({
  nights,
  chamberPrice,
  fee,
  className,
  totalPrice,
  backgroundColorStyle = "bg-gray-200",
}) => (
  <div className='border border-gray-300 rounded-md shadow-md'>
    <label
      className={`${backgroundColorStyle} ${className} block w-full p-bold-20 py-1 rounded-t-md tracking-wider border-b border-gray-400`}
    >
      Pricing Details
    </label>
    <div className='p-4 space-y-2 text-black'>
      <div className='flex justify-between'>
        <p>
          Room Price (${chamberPrice}) x {nights}{" "}
          {nights > 1 ? "nights" : "night"}:
        </p>
        <p className='font-bold'>${(nights * chamberPrice).toFixed(2)}</p>
      </div>
      <div className='flex justify-between'>
        <p>Resort Fee:</p>
        <p className='font-bold'>${fee}</p>
      </div>
      <div className='flex justify-between bg-gray-100 p-4 rounded-md mt-4'>
        <p className='text-lg font-bold'>Total Cost:</p>
        <p className='text-lg font-bold'>${totalPrice.toFixed(2)}</p>
      </div>
    </div>
  </div>
);

export default PricingDetails;
