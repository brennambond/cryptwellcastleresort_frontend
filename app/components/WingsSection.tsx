"use client";

import MotionDiv from "@/components/motion/MotionDiv";
import { fadeIn, staggerContainer } from "@/utils/motion";
import { WingType } from "./WingsList";
import { useEffect, useState } from "react";
import apiService from "../services/apiService";
import WingCard from "./WingCard";

export type WingSectionType = {
  id: string;
  name: string;
  description: string;
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
    <section className="bg-[url('../public/background-purple.png')] bg-cover bg-center py-20 md:py-40">
      <div className='flex-center flex-col relative wrapper text-white-main'>
        <div className='relative z-50'>
          <MotionDiv
            variants={staggerContainer}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true }}
            className='mx-auto flex flex-col'
          >
            <MotionDiv
              variants={fadeIn("down", "tween", 0.3, 0.7)}
              initial='hidden'
              whileInView='show'
              viewport={{ once: true }}
              className='flex-center relative flex-col text-center gap-8'
            >
              <h1 className='font-germania capitalize h1-medium'>Wings</h1>
              <p className='p-semibold-20 md:p-regular-24 font-cormorant backdrop-blur-[2px]'>
                Each corner of our resort invities you to enter a uniquely
                chilling realm from Gothic lore. Choose your fate and book a
                stay in one of our four unnaturally dreadful wings: The Wing of
                the Bloodborn, a crimson sanctuary for the eternally nocturnal;
                The Wing of the Haunted, where restless spirits endlessly roam;
                The Wing of the Arcane, a realm of eldritch enchantments and
                forbidden witchcraft; and The Wing of the Reborn, where a mad
                labratory of horrors defies death itself.
              </p>
            </MotionDiv>

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
