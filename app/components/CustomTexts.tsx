"use client";

import { motion } from "framer-motion";
import { textContainer, textVariant2 } from "@/utils/motion";

type TypingProps = {
  title: string;
};

export const TypingText: React.FC<TypingProps> = ({ title }) => {
  return (
    <motion.p
      variants={textContainer}
      className={`mt-[8px] md:text-[64px] text-[48px] font-germania text-white-main capitalize relative break-words text-center`}
    >
      {Array.from(title).map((letter, index) => (
        <motion.span variants={textVariant2} key={index}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.p>
  );
};

export const TitleText: React.FC<TypingProps> = ({ title }) => {
  return (
    <motion.h2
      variants={textVariant2}
      initial='hidden'
      whileInView='show'
      className={`mt-[8px] md:text-[80px] text-[40px] z-20 absolute font-germania text-white-main capitalize text-center`}
    >
      {title}
    </motion.h2>
  );
};
