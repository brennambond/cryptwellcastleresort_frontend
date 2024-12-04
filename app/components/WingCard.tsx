"use client";

import { WingSectionType } from "./WingsSection";

import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import MotionDiv from "@/components/motion/MotionDiv";
import Image from "next/image";
import Link from "next/link";

interface WingProps {
  wing: WingSectionType;
  active: any;
  handleClick: any;
  index: any;
}

const WingCard: React.FC<WingProps> = ({
  wing,
  active,
  handleClick,
  index,
}) => {
  return (
    <motion.div
      className={`relative ${
        active === wing.id
          ? "lg:flex-[3.5] flex-[10]"
          : "lg:flex-[0.5] flex-[2]"
      } flex-center min-w-[170px] h-[700px] transition-all duration-500 ease-in-outout cursor-pointer shadow-xl`}
      variants={fadeIn("right", "tween", (index + 1) * 0.5, 0.75)}
      initial='hidden'
      whileInView='show'
      viewport={{ once: true }}
      onClick={() => handleClick(wing.id)}
    >
      <Image
        src={wing.image_url.slice(5)}
        width={1500}
        height={1500}
        alt='image'
        className='absolute w-full h-full object-cover rounded-md '
      />
      {active !== wing.id ? (
        <h3 className='font-semibold sm:text-[26px] text-[18px] text-white-main absolute z-0 lg:bottom-20 lg:rotate-[-90deg] lg:origin-[0,0]'>
          {wing.name}
        </h3>
      ) : (
        <div className='absolute bottom-0 flex-center w-full h-full px-4 py-10 flex-col bg-[rgba(0,0,0,0.5)] rounded-md'>
          <p className='text-[24px] leading-5 text-white-main font-unifraktur'>
            Enter the Hall of the {wing.name}
          </p>
          <h2 className='mt-[24px] font-semibold text-[16px] text-white font-cormorant'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut
            laboriosam debitis perspiciatis doloribus hic delectus reiciendis
            unde saepe et nam excepturi, veritatis quam aliquid doloremque
            voluptate nihil nobis fuga iusto.
          </h2>
          <Link
            className='w-[200px] flex-center rounded-md h-[54px] p-bold-20 bg-gray-700 text-white transition cursor-pointer text-center font-unifraktur tracking-wider hover:bg-opacity-70 shadow-2xl'
            href={`/rooms/wings/${wing.id}`}
          >
            Explore further...
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default WingCard;
