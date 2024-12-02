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
          className='object-contain object-center w-full border-b-2 border-[#366f79]'
        />
        <div className='custom-shape-divider-bottom-1733169569'>
          <svg
            data-name='Layer 1'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 1200 120'
            preserveAspectRatio='none'
          >
            <path
              d='M649.97 0L599.91 54.12 550.03 0 0 0 0 120 1200 120 1200 0 649.97 0z'
              className='shape-fill'
            ></path>
          </svg>
        </div>
      </section>

      <Hero />
      <section className='mini-wrapper my-8 flex flex-col gap-8 md:gap-12'>
        <h2 className='h2-bold font-unifraktur'>Explore our Hotel</h2>
        <div className='flex w-full flex-col gap-5 md:flex-row'></div>
      </section>
    </>
  );
}
