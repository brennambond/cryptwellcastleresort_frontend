import Image from "next/image";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <>
      <section className='flex relative'>
        <Image
          src='/hotel-main-1.png'
          alt='Hotel Foyer'
          width={1500}
          height={1500}
          className='object-contain object-center w-full'
        />
      </section>

      <Hero />

      <section className="bg-[url('../public/background-2.png')] bg-cover bg-center py-20 md:py-40 text-white-main">
        <div className='flex flex-col my-20 relative mini-wrapper'>
          <h2 className='h2-bold font-unifraktur'>Wings</h2>
          <div className='flex w-full flex-col gap-5 md:flex-row'></div>
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
