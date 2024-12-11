import { FaStore } from "react-icons/fa";
import {
  GiMeal,
  GiLitCandelabra,
  GiSpookyHouse,
  GiGargoyle,
  GiVampireDracula,
} from "react-icons/gi";

const WingServices = () => {
  return (
    <div className='flex-center flex-col capitalize max-w-[90%] sm:max-w-[80%]  py-20 text-center'>
      <h2 className='h2-bold flex-center font-germania tracking-wider border-b-4  border-white-main backdrop-blur-[1px]'>
        Wing Services and Facilities Available
      </h2>

      <ul className='grid grid-cols-3 py-10 gap-10 sm:gap-12 md:gap-16 lg:gap-20 p-bold-16 items-start'>
        <li className='flex-center flex-col gap-1 '>
          <GiMeal className='w-8 h-8' />
          <p className='backdrop-blur-[1px] lg:p-bold-18'>
            Themed Dining Experiences at The Veiled Board
          </p>
        </li>
        <li className='flex-center flex-col gap-1'>
          <GiLitCandelabra className='w-8 h-8' />
          <p className='backdrop-blur-[1px] lg:p-bold-18'>
            Candlelit Hallways Filled with Mysteries and Secrets
          </p>
        </li>
        <li className='flex-center flex-col gap-1'>
          <GiSpookyHouse className='w-8 h-8' />
          <p className='backdrop-blur-[1px] lg:p-bold-18'>
            Luxurious Gothic-inspired Accomodations
          </p>
        </li>
        <li className='flex-center flex-col gap-1'>
          <GiGargoyle className='w-8 h-8' />
          <p className='backdrop-blur-[1px] lg:p-bold-18'>
            Ghost Tours Led by Spectral Guides
          </p>
        </li>
        <li className='flex-center flex-col gap-1'>
          <GiVampireDracula className='w-8 h-8' />
          <p className='backdrop-blur-[1px] lg:p-bold-18'>
            Photos With Our "Resident" Hosts
          </p>
        </li>
        <li className='flex-center flex-col gap-1'>
          <FaStore className='w-8 h-8' />
          <p className='backdrop-blur-[1px] lg:p-bold-18'>
            Shop For Unique Gothic Souvenirs
          </p>
        </li>
      </ul>
    </div>
  );
};

export default WingServices;
