import {
  GiFireSpellCast,
  GiCauldron,
  GiLunarWand,
  GiHerbsBundle,
} from "react-icons/gi";

const ArcaneServices = () => {
  return (
    <div className='flex-center flex-col capitalize max-w-[90%] sm:max-w-[80%]  py-10 lg:pb-20 lg:pt-40 text-center'>
      <h2 className='h2-bold font-germania tracking-wider border-b-4  border-white-main backdrop-blur-[1px]'>
        Arcane Wing Services and Facilities Available
      </h2>

      <ul className='grid grid-cols-2 py-10 gap-10 sm:gap-12 md:gap-16 lg:gap-20 p-bold-16 items-start'>
        <li className='flex-center flex-col gap-1 '>
          <GiFireSpellCast className='w-8 h-8' />
          <p className='backdrop-blur-[1px] lg:p-bold-18'>
            Join Candlelit Spellcasting Sessions
          </p>
        </li>
        <li className='flex-center flex-col gap-1'>
          <GiCauldron className='w-8 h-8' />
          <p className='backdrop-blur-[1px] lg:p-bold-18'>
            Experience Potion-Making Workshops
          </p>
        </li>
        <li className='flex-center flex-col gap-1'>
          <GiLunarWand className='w-8 h-8' />
          <p className='backdrop-blur-[1px] lg:p-bold-18'>
            Encounter Magical Artifacts with Shadowy Pasts
          </p>
        </li>
        <li className='flex-center flex-col gap-1'>
          <GiHerbsBundle className='w-8 h-8' />
          <p className='backdrop-blur-[1px] lg:p-bold-18'>
            Explore the Witchs' Herb Garden
          </p>
        </li>
      </ul>
    </div>
  );
};

export default ArcaneServices;
