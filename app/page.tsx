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
    </main>
  );
}
