"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

const Hero = () => {
  const router = useRouter();
  return (
    <section className='bg-[#366f79] bg-contain py-5 md:py-10 border-t-4 border-[#366f79]'>
      <div className='wrapper grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-10 2xl:gap-40'>
        <div className='flex flex-col justify-center gap-8'>
          <h1 className='h1-bold font-unifraktur text-white-main'>
            Welcome to the Haunted Hotel
          </h1>
          <p className='p-regular-20 md:p-regular-24 text-gray-200 font-cormorant'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque sunt
            iusto debitis sed quis deleniti iste corporis exercitationem quae!
            Cupiditate pariatur beatae dolore omnis!
          </p>
          <button
            className='w-full rounded-md h-[54px] p-bold-20 bg-gray-700 text-white transition cursor-pointer text-center font-unifraktur tracking-wider hover:bg-opacity-70'
            onClick={() => router.push("/rooms")}
          >
            Join our Covenant
          </button>
        </div>

        <Image
          src='/haunted-hotel-foyer.png'
          alt='Hotel Foyer'
          width={1000}
          height={1000}
          className='max-h-[70vh] object-cover object-center xl:max-w-[35vw] rounded-lg'
        />
      </div>
    </section>
  );
};

export default Hero;
