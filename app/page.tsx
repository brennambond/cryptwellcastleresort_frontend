import Image from "next/image";
import Hero from "./components/Hero";
import MotionDiv from "@/components/motion/MotionDiv";
import { fadeIn, zoomIn } from "@/utils/motion";
import WingsSection from "./components/WingsSection";

export default function Home() {
  return (
    <>
      <MotionDiv
        variants={fadeIn("up", "tween", 0.3, 0.7)}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        className='flex relative max-h-[20%]'
      >
        <Image
          src='/hotel-main-1.png'
          alt='Hotel Foyer'
          width={1500}
          height={1500}
          className='object-cover object-bottom w-full'
        />
      </MotionDiv>

      <Hero />

      <section className="bg-[url('../public/background-2.png')] bg-cover bg-center py-20 md:py-40 text-white-main">
        <div className='flex flex-col my-20 relative mini-wrapper'>
          <WingsSection />
        </div>
      </section>

      <section className="bg-[url('../public/background-purple.png')] bg-cover bg-center py-20 md:py-40 text-white-main">
        <div className='flex flex-col my-20 relative mini-wrapper'>
          <h2 className='h2-bold font-unifraktur'>Dining</h2>
          <div className='flex w-full flex-col gap-5 md:flex-row'></div>
        </div>
      </section>

      <section className="bg-[url('../public/background-red.png')] bg-cover bg-center py-20 md:py-40 text-white-main">
        <div className='flex flex-col my-20 relative mini-wrapper'>
          <h2 className='h2-bold font-unifraktur'>Contact us</h2>
          <div className='flex w-full flex-col gap-5 md:flex-row'></div>
        </div>
      </section>
    </>
  );
}
