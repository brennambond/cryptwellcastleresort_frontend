"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import MotionDiv from "@/components/motion/MotionDiv";
import { fadeIn } from "@/utils/motion";

const HeroSection = () => {
  const router = useRouter();
  return (
    <section className="bg-[url('../public/background-2.png')] bg-cover bg-center py-20 md:py-40">
      <div className='wrapper grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-10 2xl:gap-40 text-white-main text-center'>
        <MotionDiv
          variants={fadeIn("right", "tween", 0.3, 0.7)}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true }}
          className='flex flex-col justify-center gap-8 order-2 md:order-1 pt-10 md:pt-0'
        >
          <h1 className='font-germania capitalize h1-medium'>
            Welcome to The Cyptwell Castle Resort
          </h1>
          <p className='p-semibold-20 md:p-regular-24 font-cormorant backdrop-blur-[2px]'>
            Beyond wrought-iron gates and through creaking doors lies a
            sanctuary for the strange and supernatural, where the line between
            the living and the dearly departed blurs. Our delightfully unlivable
            three-story estate beckons you to explore its spectral halls and
            ghostly chambers.
          </p>
          <button
            className='button-main'
            onClick={() => router.push("/chambers")}
          >
            Explore Our Chambers
          </button>
        </MotionDiv>

        <MotionDiv
          variants={fadeIn("left", "tween", 0.3, 0.7)}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true }}
          className='order-1 md:order-2'
        >
          <Image
            src='/haunted-hotel-foyer.png'
            alt='Hotel Foyer'
            width={1000}
            height={1000}
            className='max-h-[70vh] object-cover object-center xl:max-w-[35vw] rounded-lg shadow-2xl'
          />
        </MotionDiv>
      </div>
    </section>
  );
};

export default HeroSection;
