"use client";

import { motion } from "framer-motion";
import React from "react";

interface Props {
  children: any;
  variants?: any;
  initial?: any;
  whileInView?: any;
  viewport?: any;
  className?: string;
}

const MotionNav: React.FC<Props> = ({
  children,
  variants,
  initial,
  whileInView,
  viewport,
  className,
}) => {
  return (
    <motion.nav
      variants={variants}
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      className={className}
    >
      {children}
    </motion.nav>
  );
};

export default MotionNav;
