import Image from "next/image";
import RoomList from "../components/RoomList";

import { BsPCircleFill } from "react-icons/bs";
import {
  FaAmbulance,
  FaConciergeBell,
  FaWheelchair,
  FaWifi,
} from "react-icons/fa";
import { GiTalk } from "react-icons/gi";

export default function ChambersHomePage() {
  return (
    <main className="flex-center flex-col min-h-[100vh] flex-1 py-20  bg-[url('../public/background-blue.png')] bg-center">
      <h1 className='h1-bold text-white-main flex-center font-germania tracking-wider border-b-4 max-w-[30%] border-white-main pt-20'>
        Guest Chambers
      </h1>
      <div className='flex-center flex-col py-20 mx-auto gap-8 '>
        <Image
          src='/witches-room-1.png'
          width={1000}
          height={1000}
          alt='image'
          className='max-w-[80%] object-cover object-center rounded-lg shadow-2xl brightness-150'
        />
        <p className='p-regular-20 text-white-main font-cormorant max-w-[80%]'>
          Each Wing of our resort comprises of 30 guest chambers: 16{" "}
          <strong className='italic '> Single Bedroom - 2 Beds</strong>, 10{" "}
          <strong className='italic'> Single Bedroom - 3 Beds</strong>, and 4{" "}
          <strong className='italic'> Double Bedroom Deluxe Suites</strong>.
        </p>
      </div>
      <div className='mt-4 lg:py-12 grid grid-cols-1 md:grid-cols-3 gap-20 px-12  rounded-md wrapper'>
        <RoomList />
      </div>
      <div className='mt-4 lg:py-20 px-12 wrapper flex-center flex-col text-white-main max-w-[50%]'>
        <h3 className='h3-bold font-germania tracking-wider border-b-4  border-white-main capitalize'>
          Services and facilities available
        </h3>

        <ul className='grid grid-cols-3 py-10 w-[40%] gap-20'>
          <li className='flex-center flex-col gap-1'>
            <FaAmbulance className='w-8 h-8' />
            <p className='capitalize text-center'>On-premise medical care</p>
          </li>
          <li className='flex-center flex-col gap-1'>
            <GiTalk className='w-8 h-8' />
            <p className='capitalize text-center'>24/7 Customer Service</p>
          </li>
          <li className='flex-center flex-col gap-1'>
            <FaConciergeBell className='w-8 h-8' />
            <p className='capitalize text-center'>
              Concierge and Free Luggage Service
            </p>
          </li>
          <li className='flex-center flex-col gap-1'>
            <BsPCircleFill className='w-8 h-8' />
            <p className='capitalize text-center'>Free Parking for guests</p>
          </li>
          <li className='flex-center flex-col gap-1'>
            <FaWheelchair className='w-8 h-8' />
            <p className='capitalize text-center'>Wheelchair accessible</p>
          </li>
          <li className='flex-center flex-col gap-1'>
            <FaWifi className='w-8 h-8' />
            <p className='capitalize text-center'>Free Wifi</p>
          </li>
        </ul>
      </div>
    </main>
  );
}
