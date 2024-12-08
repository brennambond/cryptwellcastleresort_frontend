import WingChambersList from "@/app/components/WingChambersList";
import apiService from "@/app/services/apiService";
import MotionDiv from "@/components/motion/MotionDiv";
import { fadeIn } from "@/utils/motion";
import Image from "next/image";
import React from "react";

const WingDetailPage = async ({ params }: { params: { id: string } }) => {
  const wing = await apiService.get(`/api/rooms/wings/${params.id}`);

  const backgroundStyle = [
    wing.name === "Bloodborn"
      ? "bg-[url('../public/background-red.png')]"
      : wing.name === "Haunted"
      ? "bg-[url('../public/background-blue.png')]"
      : wing.name === "Reborn"
      ? "bg-[url('../public/background-2.png')]"
      : "bg-[url('../public/background-purple.png')]",
  ];

  return (
    <main className={`wrapper-main ${backgroundStyle} `}>
      <div className='flex-center flex-col gap-8 wrapper'>
        <MotionDiv
          variants={fadeIn("up", "tween", 0.3, 0.7)}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true }}
          className='flex-center relative'
        >
          <Image
            width={1500}
            height={1500}
            src={wing.image_url.slice(5)}
            alt={wing.name}
            className='object-cover object-center w-full z-10 relative h-[80vh]'
          />
        </MotionDiv>

        <div className='mt-4 flex flex-col gap-6 '>
          <h1 className='h1-bold text-white-main flex-center font-germania tracking-wider border-b-4  border-white-main pt-20'>
            Wing of the {wing.name}
          </h1>
          <div>{wing.description}</div>
          <div className='mt-4 grid grid-cols-1 md:grid-cols-3 gap-20 px-12  rounded-md py-8'>
            <WingChambersList chambersWing={wing.id} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default WingDetailPage;
