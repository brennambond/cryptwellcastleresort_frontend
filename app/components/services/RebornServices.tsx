import {
  GiTestTubes,
  GiLightningArc,
  GiCryoChamber,
  GiFrankensteinCreature,
} from "react-icons/gi";

const RebornServices = () => {
  return (
    <div className='flex-center flex-col capitalize max-w-[90%] sm:max-w-[80%]  py-10 lg:pb-20 lg:pt-40 text-center'>
      <h2 className='h2-bold font-germania tracking-wider border-b-4  border-white-main backdrop-blur-[1px]'>
        Reborn Wing Services and Facilities Available
      </h2>

      <ul className='grid grid-cols-2 py-10 gap-10 sm:gap-12 md:gap-16 lg:gap-20 p-bold-16 items-start'>
        <li className='flex-center flex-col gap-1 '>
          <GiTestTubes className='w-8 h-8' />
          <p className='backdrop-blur-[1px] lg:p-bold-18'>
            Tour the Mad Scientist's Laboratory
          </p>
        </li>
        <li className='flex-center flex-col gap-1'>
          <GiLightningArc className='w-8 h-8' />
          <p className='backdrop-blur-[1px] lg:p-bold-18'>
            Witness Lightning-Powered Machinery in Electrifying Action
          </p>
        </li>
        <li className='flex-center flex-col gap-1'>
          <GiCryoChamber className='w-8 h-8' />
          <p className='backdrop-blur-[1px] lg:p-bold-18'>
            Marvel at Reanimated Creatures in Glass Chambers
          </p>
        </li>
        <li className='flex-center flex-col gap-1'>
          <GiFrankensteinCreature className='w-8 h-8' />
          <p className='backdrop-blur-[1px] lg:p-bold-18'>
            Interact with Reanimated "Assistants" Roaming the Lab
          </p>
        </li>
      </ul>
    </div>
  );
};

export default RebornServices;
