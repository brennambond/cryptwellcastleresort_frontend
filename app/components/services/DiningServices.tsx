import {
  GiLitCandelabra,
  GiHotMeal,
  GiPipeOrgan,
  GiWineBottle,
} from "react-icons/gi";

const DiningServices = () => {
  return (
    <div className='flex-center flex-col capitalize max-w-[90%] sm:max-w-[80%] pb-20 text-center'>
      <h2 className='h2-bold font-germania tracking-wider border-b-4  border-white-main backdrop-blur-[1px]'>
        Services Available at <span className='italic'>The Veiled Board</span>
      </h2>

      <ul className='grid grid-cols-2 py-10 gap-10 sm:gap-12 md:gap-16 lg:gap-20 p-bold-16 items-start'>
        <li className='flex-center flex-col gap-1 '>
          <GiLitCandelabra className='w-8 h-8' />
          <p className='backdrop-blur-[1px] lg:p-bold-18'>
            Dine Under Flickering Candelabras in a Gothic Atmosphere
          </p>
        </li>
        <li className='flex-center flex-col gap-1'>
          <GiHotMeal className='w-8 h-8' />
          <p className='backdrop-blur-[1px] lg:p-bold-18'>
            Savor Gourmet Dishes with Dark and Mysterious Flavors
          </p>
        </li>
        <li className='flex-center flex-col gap-1'>
          <GiPipeOrgan className='w-8 h-8' />
          <p className='backdrop-blur-[1px] lg:p-bold-18'>
            Enjoy Organ Performances by our Enigmatic Phantom Conductor
          </p>
        </li>
        <li className='flex-center flex-col gap-1'>
          <GiWineBottle className='w-8 h-8' />
          <p className='backdrop-blur-[1px] lg:p-bold-18'>
            Indulge in Signature “Blood-Red” Cocktails and Ethereal Desserts
          </p>
        </li>
      </ul>
    </div>
  );
};

export default DiningServices;
