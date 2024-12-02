import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className='bg-blue-main font-cormorant'>
      <div className='flex-center flex-col md:flex-row mini-wrapper flex-between gap-2 md:gap-4 px-5 text-center'>
        <Link href='/'>
          <Image
            src='/hotel-logo-main.png'
            alt='Haunted Hotel logo'
            width={500}
            height={500}
            className='w-20 md:w-[88px] lg:w-24 px-[1.125rem] py-1 md:py-2'
          />
        </Link>
        <p className='text-white-main p-bold-16 pb-4 md:pb-0'>
          2024 Haunted Hotel. All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
