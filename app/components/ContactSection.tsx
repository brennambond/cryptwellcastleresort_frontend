import MotionDiv from "@/components/motion/MotionDiv";
import { fadeIn, slideIn } from "@/utils/motion";
import Link from "next/link";
import React from "react";

const ContactSection = () => {
  return (
    <section className="bg-[url('../public/background-red.png')] bg-cover bg-center py-20 md:py-40">
      <MotionDiv
        variants={fadeIn("up", "tween", 0.3, 0.7)}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        className='flex-center flex-col w-[90%] lg:w-[80%] max-w-[90%] lg:max-w-[80%] py-[30px] wrapper text-white-main gap-8'
      >
        <h1 className='font-germania capitalize h1-medium'>
          Your Nightmare Awaits
        </h1>
        <h2 className='h3-bold md:text-[28px] md:leading-8 lg:h2-bold-t8 pb-5 lg:py-10 font-cormorant text-center'>
          Will you stalk with the Vampires, roam with the Ghouls, embrace the
          Witches' magic, or face the terrors of the Mad Labratory? Book your
          escape-or your eteranl stay-today.
        </h2>

        <div className='pt-6 lg:pt-10'>
          <Link href='/chambers' className='button-main px-4 py-2'>
            Join Us
          </Link>
        </div>
      </MotionDiv>
    </section>
  );
};

export default ContactSection;
