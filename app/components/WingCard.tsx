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
  const wing_imageurl =
    "https://hauntedhotel-backend-bucket" + wing.image_url.slice(17);
  return (
    <motion.div
      className={`relative ${
        active === wing.id
          ? "lg:flex-[3.5] flex-[10]"
          : "lg:flex-[0.5] flex-[2]"
      } flex-center min-w-[170px] h-[600px] transition-all duration-500 ease-in-out cursor-pointer shadow-xl text-center`}
      variants={fadeIn("right", "tween", (index + 1) * 0.5, 0.75)}
      initial='hidden'
      whileInView='show'
      viewport={{ once: true }}
      onClick={() => handleClick(wing.id)}
    >
      <Image
        src={wing_imageurl}
        width={1500}
        height={1500}
        alt='image'
        className='absolute w-full h-full object-cover rounded-md '
      />
      {active !== wing.id ? (
        <h3 className='font-semibold font-germania text-[26px] lg:text-[48px]  tracking-widest text-white-main z-0 lg:rotate-[-90deg] '>
          {wing.name}
        </h3>
      ) : (
        <div className='relative bottom-0 flex-center w-full h-full gap-4 xl:gap-8 flex-col bg-[rgba(0,0,0,0.5)] rounded-md wrapper-sm '>
          <h2 className='h3-bold lg:h2-bold leading-5 text-white-main font-germania tracking-[0.04em] lg:px-4'>
            Enter the Wing of the {wing.name}
          </h2>
          <p className='font-semibold text-[18px] xl:text-[20px] text-white font-cormorant lg:px-4 max-h-[80%] max-w-[90%] text-wrap backdrop-blur-sm'>
            {wing.description}
          </p>
          <Link
            className='rounded-md h-10 lg:h-[54px] p-medium-18 md:p-medium-20 bg-gray-700 text-white transition cursor-pointer flex-center px-6 font-germania capitalize tracking-wide hover:bg-gray-600 shadow-2xl'
            href={`/wings/${wing.id}`}
          >
            Explore further
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default WingCard;
