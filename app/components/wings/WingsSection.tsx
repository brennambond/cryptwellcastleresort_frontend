"use client";

import MotionDiv from "@/components/motion/MotionDiv";
import { fadeIn, staggerContainer } from "@/utils/motion";
import { useEffect, useState } from "react";
import apiService from "../../services/apiService";
import WingCard from "./WingCard";

export type WingSectionType = {
  id: string;
  name: string;
  description: string;
  image_url: string;
};

const WingsSection = () => {
  const [wings, setWings] = useState<WingSectionType[]>([]);
  const [active, setActive] = useState<WingSectionType | null>(null);

  const fetchWings = async () => {
    try {
      const response = await apiService.get("/rooms/wings/");
      setWings(response);
    } catch (error) {
      console.error("Error fetching wings:", error);
    }
  };

  useEffect(() => {
    fetchWings();
  }, []);

  useEffect(() => {
    if (wings.length > 0) {
      setActive(wings[0]);
    }
  }, [wings]);

  return (
    <section className="bg-[url('../public/background-red.png')] bg-cover bg-center py-20 lg:py-40">
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
              <h2 className='font-germania capitalize h1-medium md:text-[60px] md:leading-[60px] xl:leading-[74px] '>
                Wings
              </h2>
              <p className='p-semibold-20 lg:p-regular-24 font-cormorant backdrop-blur-[2px]'>
                Each corner of our resort invites you to enter a uniquely
                chilling realm from Gothic lore.
              </p>
            </MotionDiv>

            <div className='mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-2'>
              {wings.map((wing, index) => (
                <WingCard
                  key={wing.id}
                  wing={wing}
                  active={active}
                  handleClick={setActive}
                  index={index}
                />
              ))}
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};

export default WingsSection;
