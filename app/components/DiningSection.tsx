"use client";

import MotionDiv from "@/components/motion/MotionDiv";
import { fadeIn } from "@/utils/motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const DiningSection = () => {
  const router = useRouter();
  return (
    <section className="bg-[url('../public/background-blue.png')] bg-cover bg-center py-20 lg:py-40">
      <div className='wrapper grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-10 2xl:gap-40 text-white-main text-center items-center'>
        <MotionDiv
          variants={fadeIn("right", "tween", 0.3, 0.7)}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true }}
          className='order-1 lg:order-2'
        >
          <Image
            src='/restaraunt-1.png'
            alt='Hotel Restaraunt'
            width={1000}
            height={1000}
            className='lg:max-h-[70vh] lg:h-[50vh] object-cover object-center rounded-lg shadow-2xl'
          />
        </MotionDiv>

        <MotionDiv
          variants={fadeIn("left", "tween", 0.3, 0.7)}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true }}
          className='flex flex-col justify-center gap-8 order-2 lg:order-1 pt-10 lg:pt-0'
        >
          <h1 className='font-germania capitalize h1-medium'>Dining</h1>
          <p className='p-semibold-20 lg:p-regular-24 font-cormorant backdrop-blur-[2px]'>
            Dine among our dearly departed at our signature restaurant{" "}
            <span className='italic font-germania'>The Veiled Board</span>,
            where the veil between the living and the departed is not just
            thin—it’s the setting for the most unforgettable meal of your
            afterlife.
          </p>
          <div className='pt-6 lg:pt-10'>
            <Link className='button-main px-6 py-3' href='/dining'>
              Enter the Veil
            </Link>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};

export default DiningSection;
