import Image from "next/image";

import { FaBed } from "react-icons/fa";
import { GiBathtub, GiSofa, GiMagicBroom } from "react-icons/gi";
import MotionDiv from "@/components/motion/MotionDiv";
import { fadeIn } from "@/utils/motion";
import ChambersList from "../components/ChambersList";
import SearchFilters from "../components/header/SearchFilters";

export default function ChambersHomePage() {
  return (
    <main className="wrapper-main bg-[url('../public/background-blue.png')] gap-20">
      <MotionDiv
        variants={fadeIn("up", "tween", 0.3, 0.7)}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        className='flex-center flex-col gap-10 sm:w-[90%] max-w-[90%] md:w-[80%] md:max-w-[80%] '
      >
        <h1 className='h1-bold flex-center font-germania tracking-wider border-b-4  border-white-main pt-20'>
          Guest Chambers
        </h1>
        <Image
          src='/witches-room-1.png'
          width={1000}
          height={1000}
          alt='image'
          className='object-cover object-center rounded-xl shadow-2xl overflow-hidden h-[50vh] md:h-[70vh] xl:h-[80vh]'
        />
        <p className='p-medium-18 md:p-medium-20 xl:max-w-[90%]'>
          Each Wing of our resort comprises of 30 guest chambers: 16{" "}
          <strong className='italic '> Single Bedrooms with 2 Beds</strong>, 10{" "}
          <strong className='italic'> Single Bedrooms with 3 Beds</strong>, and
          4 <strong className='italic'> Double Bedroom Deluxe Suites</strong>.{" "}
          <SearchFilters />
        </p>
      </MotionDiv>

      <ChambersList />

      <div className='flex-center flex-col capitalize max-w-[90%] sm:max-w-[80%] lg:max-w-[60%] py-10 lg:py-20 text-center'>
        <h2 className='h2-bold font-germania tracking-wider border-b-4  border-white-main backdrop-blur-[1px]'>
          Chamber Services and Facilities Available
        </h2>

        <ul className='grid grid-cols-3 py-10 gap-10 sm:gap-12 md:gap-16 lg:gap-20 p-bold-16'>
          <li className='flex-center flex-col gap-1 '>
            <GiSofa className='w-8 h-8' />
            <p className='backdrop-blur-[1px] lg:p-bold-18'>
              On-premise medical care
            </p>
          </li>
          <li className='flex-center flex-col gap-1'>
            <GiBathtub className='w-8 h-8' />
            <p className='backdrop-blur-[1px] lg:p-bold-18'>
              24/7 Customer Service
            </p>
          </li>
          <li className='flex-center flex-col gap-1'>
            <GiBathtub className='w-8 h-8' />
            <p className='backdrop-blur-[1px] lg:p-bold-18'>
              Concierge and Free Luggage Service
            </p>
          </li>
          <li className='flex-center flex-col gap-1'>
            <FaBed className='w-8 h-8' />
            <p className='backdrop-blur-[1px] lg:p-bold-18'>
              Free Parking for guests
            </p>
          </li>
          <li className='flex-center flex-col gap-1'>
            <GiMagicBroom className='w-8 h-8' />
            <p className='backdrop-blur-[1px] lg:p-bold-18'>
              Wheelchair accessible
            </p>
          </li>
          <li className='flex-center flex-col gap-1'>
            <GiMagicBroom className='w-8 h-8' />
            <p className='backdrop-blur-[1px] lg:p-bold-18'>Free Wifi</p>
          </li>
        </ul>
      </div>
    </main>
  );
}
