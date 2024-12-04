"use client";

import MotionDiv from "@/components/motion/MotionDiv";
import { staggerContainer } from "@/utils/motion";
import { WingType } from "./WingsList";
import { useEffect, useState } from "react";
import apiService from "../services/apiService";
import WingCard from "./WingCard";

export type WingSectionType = {
  id: string;
  name: string;
  image_url: string;
};

const WingsSection = () => {
  const [wings, setWings] = useState<WingSectionType[]>([]);
  const getWings = async () => {
    const tmpWings = await apiService.get("/api/rooms/wings/");

    setWings(tmpWings.data);
    console.log(tmpWings);
  };

  useEffect(() => {
    getWings();
  }, []);

  const [active, setActive] = useState(wings[1]);

  return (
    <section className='relative z-50 '>
      <MotionDiv
        variants={staggerContainer}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        className='mx-auto flex flex-col'
      >
        <h2>Wings</h2>
        <div className='mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-2 backdrop-blur-sm '>
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
      </MotionDiv>
    </section>
  );
};

export default WingsSection;
