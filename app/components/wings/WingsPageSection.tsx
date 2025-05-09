"use client";

import MotionDiv from "@/components/motion/MotionDiv";
import { fadeIn, staggerContainer } from "@/utils/motion";
import { useEffect, useState } from "react";
import { WingSectionType } from "./WingsSection";
import apiService from "../../services/apiService";
import WingCard from "./WingCard";
import WingServices from "../services/WingServices";

const WingsPageSection = () => {
  const [wings, setWings] = useState<WingSectionType[]>([]);
  const [active, setActive] = useState<WingSectionType | null>(null);

  const getWings = async () => {
    try {
      const response = await apiService.get("/rooms/wings/");
      setWings(response);
    } catch (error) {
      console.error("Error fetching wings:", error);
    }
  };

  useEffect(() => {
    getWings();
  }, []);

  useEffect(() => {
    if (wings.length > 0) {
      setActive(wings[0]);
    }
  }, [wings]);
  return (
    <MotionDiv
      variants={staggerContainer}
      initial='hidden'
      whileInView='show'
      viewport={{ once: true }}
      className='flex-center flex-col wrapper text-white-main '
    >
      <MotionDiv
        variants={fadeIn("down", "tween", 0.3, 0.7)}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
      >
        <h1 className='h1-bold text-white-main flex-center font-germania tracking-wider border-b-4  border-white-main pt-20'>
          Choose Your Fate
        </h1>
      </MotionDiv>

      <div className='mt-[50px] flex w-full lg:flex-row flex-col min-h-[70vh] gap-2 '>
        {wings.map((wing) => {
          const index = wings.indexOf(wing);
          return (
            <WingCard
              key={wing.id}
              wing={wing}
              active={active}
              handleClick={setActive}
              index={index}
            />
          );
        })}
      </div>
      <WingServices />
    </MotionDiv>
  );
};

export default WingsPageSection;
