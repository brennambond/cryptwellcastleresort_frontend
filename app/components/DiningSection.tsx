"use client";

import MotionDiv from "@/components/motion/MotionDiv";
import { fadeIn } from "@/utils/motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const DiningSection = () => {
  const router = useRouter();
  return (
    <section className="bg-[url('../public/background-blue.png')] bg-cover bg-center py-20 md:py-40">
      <div className='wrapper grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-10 2xl:gap-40'>
        <MotionDiv
          variants={fadeIn("right", "tween", 0.3, 0.7)}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true }}
          className='flex-center'
        >
          <Image
            src='/restaraunt-1.png'
            alt='Hotel Restaraunt'
            width={1000}
            height={1000}
            className='xl:max-w-[40vw] h-[60vh] rounded-lg shadow-2xl'
          />
        </MotionDiv>

        <MotionDiv
          variants={fadeIn("left", "tween", 0.3, 0.7)}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true }}
          className='flex-center flex-col gap-8 text-white-main'
        >
          <h1 className='font-germania capitalize h1-medium'>Dining</h1>
          <p className='p-regular-20 md:p-regular-24 font-cormorant '>
            Dine among our dearly departed at our signature restaurant{" "}
            <span className='italic p-regular-24 font-germania'>
              The Veiled Board
            </span>
            , where its devilish delights are to die for.
          </p>
          <button
            className='button-main'
            onClick={() => router.push("/dining")}
          >
            Enter the Veil
          </button>
        </MotionDiv>
      </div>
    </section>
  );
};

export default DiningSection;
