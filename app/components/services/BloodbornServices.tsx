import {
  GiRestingVampire,
  GiChaliceDrops,
  GiDeathNote,
  GiVampireCape,
} from "react-icons/gi";

const BloodbornServices = () => {
  return (
    <div className='flex-center flex-col capitalize max-w-[90%] sm:max-w-[80%]  py-10 lg:pb-20 lg:pt-40 text-center'>
      <h2 className='h2-bold font-germania tracking-wider border-b-4  border-white-main backdrop-blur-[1px]'>
        Bloodborn Wing Services and Facilities Available
      </h2>

      <ul className='grid grid-cols-2 py-10 gap-10 sm:gap-12 md:gap-16 lg:gap-20 p-bold-16 items-start'>
        <li className='flex-center flex-col gap-1 '>
          <GiRestingVampire className='w-8 h-8' />
          <p className='backdrop-blur-[1px] lg:p-bold-18'>
            Hear Haunting Tales from Centuries-Old Vampire Residents
          </p>
        </li>
        <li className='flex-center flex-col gap-1'>
          <GiChaliceDrops className='w-8 h-8' />
          <p className='backdrop-blur-[1px] lg:p-bold-18'>
            Candlelit Wine Tastings in the Crimson Lounge
          </p>
        </li>
        <li className='flex-center flex-col gap-1'>
          <GiDeathNote className='w-8 h-8' />
          <p className='backdrop-blur-[1px] lg:p-bold-18'>
            Uncover Vampire Lore in the Bloodstone Library
          </p>
        </li>
        <li className='flex-center flex-col gap-1'>
          <GiVampireCape className='w-8 h-8' />
          <p className='backdrop-blur-[1px] lg:p-bold-18'>
            Nocturnal Soirées Hosted by Our Immortal Hosts
          </p>
        </li>
      </ul>
    </div>
  );
};

export default BloodbornServices;
