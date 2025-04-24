import WingsSection from "./components/wings/WingsSection";

import HotelIntro from "./components/HotelIntro";
import DiningSection from "./components/DiningSection";
import HeroSection from "./components/HeroSection";
import ContactSection from "./components/ContactSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Cryptwell Castle Resort",
};

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
