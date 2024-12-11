import {
  GiCandleSkull,
  GiUnlitCandelabra,
  GiRoundTable,
  GiSpectre,
} from "react-icons/gi";

const HauntedServices = () => {
  return (
    <div className='flex-center flex-col capitalize max-w-[90%] sm:max-w-[80%]  py-10 lg:pb-20 lg:pt-40 text-center'>
      <h2 className='h2-bold font-germania tracking-wider border-b-4  border-white-main backdrop-blur-[1px]'>
        Haunted Wing Services and Facilities Available
      </h2>

      <ul className='grid grid-cols-2 py-10 gap-10 sm:gap-12 md:gap-16 lg:gap-20 p-bold-16 items-start'>
        <li className='flex-center flex-col gap-1 '>
          <GiCandleSkull className='w-8 h-8' />
          <p className='backdrop-blur-[1px] lg:p-bold-18'>
            Attend Séances to Connect with Restless Spirits
          </p>
        </li>
        <li className='flex-center flex-col gap-1'>
          <GiUnlitCandelabra className='w-8 h-8' />
          <p className='backdrop-blur-[1px] lg:p-bold-18'>
            Listen to Chilling Ghost Stories by Flickering Candlelight
          </p>
        </li>
        <li className='flex-center flex-col gap-1'>
          <GiRoundTable className='w-8 h-8' />
          <p className='backdrop-blur-[1px] lg:p-bold-18'>
            Dine Amongst the Living—and Dead
          </p>
        </li>
        <li className='flex-center flex-col gap-1'>
          <GiSpectre className='w-8 h-8' />
          <p className='backdrop-blur-[1px] lg:p-bold-18'>
            Visit the Spectre's Parlor for Interactive Ghostly Encounters
          </p>
        </li>
      </ul>
    </div>
  );
};

export default HauntedServices;
