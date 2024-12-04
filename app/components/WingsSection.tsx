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
    <section className="bg-[url('../public/background-blue.png')] bg-cover bg-center sm:p-16 xs:p-8 px-6 py-12  text-white-main">
      <div className='flex flex-col my-20 relative mini-wrapper z-50'>
        <div className='relative z-50 '>
          <MotionDiv
            variants={staggerContainer}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true }}
            className='mx-auto flex flex-col'
          >
            <h2>Wings</h2>
            <div className='mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-2'>
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
        </div>
      </div>
    </section>
  );
};

export default WingsSection;
