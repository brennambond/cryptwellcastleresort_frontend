"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import MotionDiv from "@/components/motion/MotionDiv";
import { fadeIn } from "@/utils/motion";
import Link from "next/link";

const HeroSection = () => {
  const router = useRouter();
  return (
    <section className="bg-[url('../public/background-2.png')] bg-cover bg-center py-20 lg:py-40">
      <div className='wrapper grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-10 xl:gap-20 2xl:gap-40 text-white-main text-center'>
        <MotionDiv
          variants={fadeIn("right", "tween", 0.3, 0.7)}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true }}
          className='flex flex-col justify-center gap-8 order-2 lg:order-1 pt-10 lg:pt-0'
        >
          <h2 className='font-germania capitalize h1-medium md:text-[60px] md:leading-[60px] xl:leading-[74px] '>
            Welcome to{" "}
            <span className='italic'>The Cyptwell Castle Resort</span>
          </h2>
          <p className='p-semibold-20 lg:p-regular-24 font-cormorant backdrop-blur-[2px]'>
            Beyond wrought-iron gates and through creaking doors lies a
            sanctuary for the strange and supernatural, where the line between
            the living and the dearly departed blurs. Our delightfully unlivable
            three-story estate beckons you to explore its spectral halls and
            ghostly chambers.
          </p>
          <div className='pt-6 lg:pt-10 flex-center'>
            <Link className='button-main max-w-[60%]' href='/chambers'>
              Explore Our Chambers
            </Link>
          </div>
        </MotionDiv>

        <MotionDiv
          variants={fadeIn("left", "tween", 0.3, 0.7)}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true }}
          className='order-1 lg:order-2'
        >
          <Image
            src='/haunted-hotel-foyer.png'
            alt='Hotel Foyer'
            width={1000}
            height={1000}
            className='max-h-[70vh] md:max-h-[60vh] object-cover object-center rounded-lg shadow-2xl'
          />
        </MotionDiv>
      </div>
    </section>
  );
};

export default HeroSection;
