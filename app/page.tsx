import Image from "next/image";
import Hero from "./components/Hero";
import MotionDiv from "@/components/motion/MotionDiv";
import { fadeIn, zoomIn } from "@/utils/motion";
import WingsSection from "./components/WingsSection";
import { TitleText, TypingText } from "./components/CustomTexts";
import HotelIntro from "./components/HotelIntro";
import RestarauntSection from "./components/RestarauntSection";

export default function Home() {
  return (
    <main className='flex flex-col min-h-[100vh] flex-1'>
      <HotelIntro />
      <Hero />
      <WingsSection />
      <RestarauntSection />

      <section className="bg-[url('../public/background-red.png')] bg-cover bg-center py-20 md:py-40 text-white-main">
        <div className='flex flex-col my-20 relative mini-wrapper'>
          <h2 className='h2-bold font-unifraktur'>Contact us</h2>
          <div className='flex w-full flex-col gap-5 md:flex-row'></div>
        </div>
      </section>
    </main>
  );
}
