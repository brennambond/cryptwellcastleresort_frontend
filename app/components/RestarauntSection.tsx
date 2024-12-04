"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const RestarauntSection = () => {
  const router = useRouter();
  return (
    <section className="bg-[url('../public/background-2.png')] bg-cover bg-center py-20 md:py-40">
      <div className='wrapper grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-10 2xl:gap-40'>
        <Image
          src='/restaraunt-1.png'
          alt='Hotel Restaraunt'
          width={1000}
          height={1000}
          className=' object-center xl:max-w-[40vw] h-[60vh] rounded-lg shadow-2xl'
        />
        <div className='flex flex-col justify-center gap-8 text-white-main'>
          <h1 className='h1-bold font-germania'>Dining</h1>
          <p className='p-regular-20 md:p-regular-24 font-cormorant '>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque sunt
            iusto debitis sed quis deleniti iste corporis exercitationem quae!
            Cupiditate pariatur beatae dolore omnis!
          </p>
          <button
            className='w-full rounded-md h-[54px] p-bold-20 bg-gray-700 text-white transition cursor-pointer text-center font-unifraktur tracking-wider hover:bg-opacity-70 shadow-2xl'
            onClick={() => router.push("/restaraunts")}
          >
            Join our Covenant
          </button>
        </div>
      </div>
    </section>
  );
};

export default RestarauntSection;
