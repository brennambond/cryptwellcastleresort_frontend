import MotionDiv from "@/components/motion/MotionDiv";
import { fadeIn, slideIn } from "@/utils/motion";
import Link from "next/link";
import React from "react";

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
        className='flex-center flex-col w-[90%] lg:w-[80%] max-w-[90%] lg:max-w-[80%] py-[30px] wrapper text-white-main gap-8'
      >
        <h1 className='font-germania capitalize h1-medium md:text-[60px] md:leading-[60px]  xl:text-[58px] xl:leading-[74px]'>
          Your Nightmare Awaits
        </h1>
        <h2 className='h3-bold md:text-[28px] md:leading-8 lg:h2-bold pb-5 lg:py-10 font-cormorant text-center backdrop-blur-[2px] lg:backdrop-blur-[1px]'>
          Will you stalk with the Vampires, roam with the Ghouls, embrace the
          Witches' magic, or face the terrors of the Mad Labratory? Book your
          escape-or your eteranl stay-today.
        </h2>

        <div className='pt-6 lg:pt-10'>
          <Link href='/chambers' className='button-main px-6 py-3'>
            Join Us
          </Link>
        </div>

        <div className='mt-4 lg:pt-20 px-12 wrapper flex-center flex-col text-white-main w-full'>
          <h2 className='h2-bold font-germania tracking-wider border-b-4  border-white-main capitalize backdrop-blur-[1px]'>
            Hotel Services Available
          </h2>

          <ul className='grid grid-cols-3 py-10 w-[50%] gap-20 font-cormorant p-bold-18'>
            <li className='flex-center flex-col gap-1 '>
              <FaAmbulance className='w-8 h-8' />
              <p className='capitalize text-center backdrop-blur-[1px]'>
                On-premise medical care
              </p>
            </li>
            <li className='flex-center flex-col gap-1'>
              <GiTalk className='w-8 h-8' />
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
      </MotionDiv>
    </section>
  );
};

export default ContactSection;
