import { FaBaby, FaBed, FaUtensils } from "react-icons/fa";
import { GiBathtub, GiSofa, GiMagicBroom } from "react-icons/gi";
const ChamberServices = () => {
  return (
    <div className='flex-center flex-col capitalize max-w-[90%] sm:max-w-[80%]  py-10 lg:py-20 text-center'>
      <h2 className='h2-bold font-germania tracking-wider border-b-4  border-white-main backdrop-blur-[1px]'>
        Chamber Services and Facilities Available
      </h2>

      <ul className='grid grid-cols-3 py-10 gap-10 sm:gap-12 md:gap-16 lg:gap-20 p-bold-16 items-start'>
        <li className='flex-center flex-col gap-1 '>
          <GiSofa className='w-8 h-8' />
          <p className='backdrop-blur-[1px] lg:p-bold-18'>
            Luxury Furniture For Ideal Lounging
          </p>
        </li>
        <li className='flex-center flex-col gap-1'>
          <GiBathtub className='w-8 h-8' />
          <p className='backdrop-blur-[1px] lg:p-bold-18'>
            Luxury Bathrooms For Ideal Relaxation
          </p>
        </li>
        <li className='flex-center flex-col gap-1'>
          <FaBaby className='w-8 h-8' />
          <p className='backdrop-blur-[1px] lg:p-bold-18'>
            Ameneties For Children
          </p>
        </li>
        <li className='flex-center flex-col gap-1'>
          <FaBed className='w-8 h-8' />
          <p className='backdrop-blur-[1px] lg:p-bold-18'>
            Industry-Leading Bedding For Maximum Comfort
          </p>
        </li>
        <li className='flex-center flex-col gap-1'>
          <GiMagicBroom className='w-8 h-8' />
          <p className='backdrop-blur-[1px] lg:p-bold-18'>Free Housekeeping</p>
        </li>
        <li className='flex-center flex-col gap-1'>
          <FaUtensils className='w-8 h-8' />
          <p className='backdrop-blur-[1px] lg:p-bold-18'>Free Room Service</p>
        </li>
      </ul>
    </div>
  );
};

export default ChamberServices;
