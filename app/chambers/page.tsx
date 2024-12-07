import Image from "next/image";
import RoomList from "../components/RoomList";

import { BsPCircleFill } from "react-icons/bs";
import {
  FaAmbulance,
  FaBed,
  FaConciergeBell,
  FaWheelchair,
  FaWifi,
} from "react-icons/fa";
import { GiBathtub, GiSofa, GiMagicBroom } from "react-icons/gi";

export default function ChambersHomePage() {
  return (
    <main className="flex-center flex-col min-h-[100vh] flex-1 bg-[url('../public/background-blue.png')] bg-center py-20 text-white-main ">
      <div className='flex-center flex-col mx-auto gap-8'>
        <h1 className='h1-bold text-white-main flex-center font-germania tracking-wider border-b-4  border-white-main pt-20'>
          Guest Chambers
        </h1>
        <Image
          src='/witches-room-1.png'
          width={1000}
          height={1000}
          alt='image'
          className='max-w-[80%] object-cover object-center rounded-2xl shadow-2xl mt-10 overflow-hidden'
        />
        <p className='p-regular-20 text-white-main font-cormorant max-w-[80%]'>
          Each Wing of our resort comprises of 30 guest chambers: 16{" "}
          <strong className='italic '> Single Bedrooms with 2 Beds</strong>, 10{" "}
          <strong className='italic'> Single Bedrooms with 3 Beds</strong>, and
          4 <strong className='italic'> Double Bedroom Deluxe Suites</strong>.
        </p>
      </div>
      <div className='mt-4 lg:py-12 grid grid-cols-1 md:grid-cols-3 gap-20 px-12  rounded-md wrapper'>
        <RoomList />
      </div>
      <div className='mt-4 lg:py-20 px-12 wrapper flex-center flex-col text-white-main w-full'>
        <h2 className='h2-bold font-germania tracking-wider border-b-4  border-white-main capitalize backdrop-blur-[1px]'>
          Chamber Services and Facilities Available
        </h2>

        <ul className='grid grid-cols-3 py-10 w-[60%] gap-20 font-cormorant p-bold-18'>
          <li className='flex-center flex-col gap-1 '>
            <FaAmbulance className='w-8 h-8' />
            <p className='capitalize text-center backdrop-blur-[1px]'>
              On-premise medical care
            </p>
          </li>
          <li className='flex-center flex-col gap-1'>
            <GiBathtub className='w-8 h-8' />
            <p className='capitalize text-center backdrop-blur-[1px]'>
              24/7 Customer Service
            </p>
          </li>
          <li className='flex-center flex-col gap-1'>
            <FaConciergeBell className='w-8 h-8' />
            <p className='capitalize text-center backdrop-blur-[1px]'>
              Concierge and Free Luggage Service
            </p>
          </li>
          <li className='flex-center flex-col gap-1'>
            <BsPCircleFill className='w-8 h-8' />
            <p className='capitalize text-center backdrop-blur-[1px]'>
              Free Parking for guests
            </p>
          </li>
          <li className='flex-center flex-col gap-1'>
            <FaWheelchair className='w-8 h-8' />
            <p className='capitalize text-center backdrop-blur-[1px]'>
              Wheelchair accessible
            </p>
          </li>
          <li className='flex-center flex-col gap-1'>
            <FaWifi className='w-8 h-8' />
            <p className='capitalize text-center backdrop-blur-[1px]'>
              Free Wifi
            </p>
          </li>
        </ul>
      </div>
    </main>
  );
}
