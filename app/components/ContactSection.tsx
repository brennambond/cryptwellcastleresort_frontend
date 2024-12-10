import MotionDiv from "@/components/motion/MotionDiv";
import { fadeIn } from "@/utils/motion";
import Link from "next/link";

import { BsPCircleFill } from "react-icons/bs";
import {
  FaAmbulance,
  FaConciergeBell,
  FaWheelchair,
  FaWifi,
} from "react-icons/fa";
import { GiTalk } from "react-icons/gi";

const ContactSection = () => {
  return (
    <section className="bg-[url('../public/background-purple.png')] bg-cover bg-center py-20 md:py-40">
      <MotionDiv
        variants={fadeIn("up", "tween", 0.3, 0.7)}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        className='flex-center flex-col w-[90%] lg:w-[80%] max-w-[90%] lg:max-w-[80%] wrapper text-white-main gap-8 font-cormorant text-center'
      >
        <div className='flex-center flex-col gap-10 md:gap-14'>
          <h2 className='font-germania capitalize h1-medium md:text-[60px] md:leading-[60px] xl:leading-[74px]'>
            Your Nightmare Awaits
          </h2>
          <p className='p-bold-24 md:text-[28px] md:leading-8 lg:h3-bold backdrop-blur-[1px]'>
            Will you stalk with the Vampires, roam with the Ghouls, embrace the
            Witches' magic, or face the terrors of the Mad Labratory? Book your
            escape-or your eternal stay-today.
          </p>

          <Link
            href='/chambers'
            className='button-main px-6 py-3 max-w-[40%] lg:max-w-[20%]'
          >
            Join Us
          </Link>
        </div>

        <div className='flex-center flex-col text-white-main capitalize max-w-[90%] sm:max-w-[80%] pt-40'>
          <h2 className='h2-bold font-germania tracking-wider border-b-4  border-white-main backdrop-blur-[1px]'>
            Hotel Services Available
          </h2>

          <ul className='grid grid-cols-3 py-10 gap-10 sm:gap-12 md:gap-16 lg:gap-20 p-bold-16 items-start'>
            <li className='flex-center flex-col gap-1 '>
              <FaAmbulance className='w-8 h-8' />
              <p className='backdrop-blur-[1px] lg:p-bold-18'>
                On-premise medical care
              </p>
            </li>
            <li className='flex-center flex-col gap-1'>
              <GiTalk className='w-8 h-8' />
              <p className='backdrop-blur-[1px] lg:p-bold-18'>
                24/7 Customer Service
              </p>
            </li>
            <li className='flex-center flex-col gap-1'>
              <FaConciergeBell className='w-8 h-8' />
              <p className='backdrop-blur-[1px] lg:p-bold-18'>
                Concierge and Free Luggage Service
              </p>
            </li>
            <li className='flex-center flex-col gap-1'>
              <BsPCircleFill className='w-8 h-8' />
              <p className='backdrop-blur-[1px] lg:p-bold-18'>
                Free Parking for guests
              </p>
            </li>
            <li className='flex-center flex-col gap-1'>
              <FaWheelchair className='w-8 h-8' />
              <p className='backdrop-blur-[1px] lg:p-bold-18'>
                Wheelchair accessible
              </p>
            </li>
            <li className='flex-center flex-col gap-1'>
              <FaWifi className='w-8 h-8' />
              <p className='backdrop-blur-[1px] lg:p-bold-18'>Free Wifi</p>
            </li>
          </ul>
        </div>
      </MotionDiv>
    </section>
  );
};

export default ContactSection;
