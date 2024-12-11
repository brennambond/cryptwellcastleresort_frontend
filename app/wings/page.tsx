"use client";

import MotionDiv from "@/components/motion/MotionDiv";
import { staggerContainer } from "@/utils/motion";
import { useEffect, useState } from "react";
import { WingSectionType } from "../components/WingsSection";
import apiService from "../services/apiService";
import WingCard from "../components/WingCard";
import WingServices from "../components/services/WingServices";

export default function WingsHomePage() {
  const [wings, setWings] = useState<WingSectionType[]>([]);
  const getWings = async () => {
    const tmpWings = await apiService.get("/api/rooms/wings/");

    setWings(tmpWings.data);
  };

  useEffect(() => {
    getWings();
  }, []);

  const [active, setActive] = useState(wings[1]);
  return (
    <main className="wrapper-main bg-[url('../public/background-blue.png')]">
      <div className='flex-center flex-col py-20 mx-auto gap-8 relative wrapper '>
        <h1 className='h1-bold text-white-main flex-center font-germania tracking-wider border-b-4  border-white-main pt-20'>
          Choose Your Fate
        </h1>
        <div className='relative z-50 w-full'>
          <MotionDiv
            variants={staggerContainer}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true }}
            className='mx-auto flex flex-col'
          >
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
      <WingServices />
    </main>
  );
}
