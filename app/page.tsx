import Hero from "./components/HeroSection";

import WingsSection from "./components/WingsSection";

import HotelIntro from "./components/HotelIntro";
import DiningSection from "./components/DiningSection";
import HeroSection from "./components/HeroSection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <main className='flex flex-col min-h-[100vh] flex-1'>
      <HotelIntro />
      <HeroSection />
      <WingsSection />
      <DiningSection />
      <ContactSection />

      {/* <section className="bg-[url('../public/background-red.png')] bg-cover bg-center py-20 md:py-40 text-white-main">
        <div className='flex flex-col my-20 relative mini-wrapper'>
          <h2 className='h2-bold font-unifraktur'>Contact us</h2>
          <div className='flex w-full flex-col gap-5 md:flex-row'></div>
        </div>
      </section> */}
    </main>
  );
}
