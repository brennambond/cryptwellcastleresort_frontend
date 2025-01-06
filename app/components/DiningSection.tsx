"use client";

import MotionDiv from "@/components/motion/MotionDiv";
import { fadeIn } from "@/utils/motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const DiningSection = () => {
  // Test
  const router = useRouter();
  return (
    <section className="bg-[url('../public/background-blue.png')] bg-cover bg-center py-20">
      <div className='wrapper flex-center flex-col gap-5 lg:gap-10 xl:gap-20 text-white-main text-center'>
        <MotionDiv
          variants={fadeIn("right", "tween", 0.3, 0.7)}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true }}
          className='flex-center '
        >
          <Image
            src='/restaraunt-1.png'
            alt='Hotel Restaraunt'
            width={1000}
            height={1000}
            className='max-h-[70vh] md:max-h-[60vh] md:max-w-[80%] object-cover object-center rounded-lg shadow-2xl'
          />
        </MotionDiv>

        <MotionDiv
          variants={fadeIn("left", "tween", 0.3, 0.7)}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true }}
          className='flex-center flex-col gap-8  pt-10 lg:pt-0 md:max-w-[80%]'
        >
          <h2 className='font-germania capitalize h1-medium md:text-[60px] md:leading-[60px] xl:leading-[74px] '>
            Dining
          </h2>
          <p className='p-bold-20 lg:p-regular-24 font-cormorant backdrop-blur-[2px]'>
            Dine among our dearly departed at our signature restaurant{" "}
            <span className='italic font-germania'>The Veiled Board</span>,
            where the veil between the living and the departed is not just
            thin—it’s the setting for the most unforgettable meal of your
            afterlife.
          </p>
        </MotionDiv>
        <div className='pt-6 lg:pt-10 flex-center'>
          <Link className='button-main' href='/dining'>
            Enter the Veil
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DiningSection;
