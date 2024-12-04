import Image from "next/image";
import Hero from "./components/Hero";
import MotionDiv from "@/components/motion/MotionDiv";
import { fadeIn, zoomIn } from "@/utils/motion";
import WingsSection from "./components/WingsSection";
import { TitleText, TypingText } from "./components/CustomTexts";

export default function Home() {
  return (
    <main className='flex flex-col min-h-[100vh] flex-1'>
      <MotionDiv
        variants={fadeIn("up", "tween", 0.3, 0.7)}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        className='flex-center relative max-h-[20%]'
      >
        <Image
          src='/hotel-main-1.png'
          alt='Hotel Main'
          width={1500}
          height={1500}
          className='object-cover object-bottom w-full z-10 relative'
        />
        <TypingText title={"Choose the world you want to explore"} />
      </MotionDiv>

      <Hero />

      <section className="bg-[url('../public/background-blue.png')] bg-cover bg-center sm:p-16 xs:p-8 px-6 py-12  text-white-main">
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
    </main>
  );
}
