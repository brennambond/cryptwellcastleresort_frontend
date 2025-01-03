import MotionDiv from "@/components/motion/MotionDiv";
import { fadeIn } from "@/utils/motion";
import Image from "next/image";
import DiningServices from "../components/services/DiningServices";
import { Metadata } from "next";
import TestSpinner from "../components/TestSpinner";

export const metadata: Metadata = {
  title: "Dining | Cryptwell Castle Resort",
};

export default function DiningHomePage() {
  return (
    <main className="wrapper-main bg-[url('../public/background-blue.png')] gap-20">
      <MotionDiv
        variants={fadeIn("down", "tween", 0.3, 0.7)}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        className='flex-center flex-col sm:w-[90%] max-w-[90%] md:w-[80%] md:max-w-[80%] pt-20'
      >
        <Image
          width={1000}
          height={1000}
          src='/restaraunt-1.png'
          alt='The Veiled Board'
          className='object-cover object-center rounded-xl shadow-2xl overflow-hidden h-[50vh] md:h-[70vh] xl:h-[80vh]'
        />
      </MotionDiv>
      <MotionDiv
        variants={fadeIn("up", "tween", 0.3, 0.7)}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        className='flex-center flex-col text-center gap-6 md:max-w-[90%] lg:max-w-[80%]'
      >
        <h1 className='flex-center h2-bold font-germania tracking-wider border-b-4 border-white-main '>
          Welcome to the The Veiled Board
        </h1>
        <div className='p-regular-18 lg:p-regular-20 max-w-[90%] lg:max-w-full backdrop-blur-[2px]'>
          Step into a realm of spectral sophistication where elegance and the
          ethereal intertwine. At{" "}
          <strong className='italic'>The Veiled Board</strong>, ghostly
          attendants glide effortlessly between shadowed tables, their spectral
          presence adding an air of otherworldly charm, ensuring your every
          desire is met with otherworldly grace. The flicker of candlelight
          dances on polished Gothic furnishings, while the distant strains of an
          organ, played by our enigmatic phantom conductor, fill the air with
          hauntingly beautiful melodies. Every dish is a masterpiece, every
          moment a brush with the supernatural. Prepare to dine in a world where
          the veil between the living and the departed is not just thin—it’s the
          setting for your unforgettable meal.
        </div>
      </MotionDiv>

      <DiningServices />
    </main>
  );
}
