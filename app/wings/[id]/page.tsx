import ArcaneServices from "@/app/components/services/ArcaneServices";
import BloodbornServices from "@/app/components/services/BloodbornServices";
import HauntedServices from "@/app/components/services/HauntedServices";
import RebornServices from "@/app/components/services/RebornServices";
import WingChambersList from "@/app/components/wings/WingChambersList";

import apiService from "@/app/services/apiService";
import MotionDiv from "@/components/motion/MotionDiv";
import { fadeIn } from "@/utils/motion";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export type SearchParamProps = {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const WingDetailPage = async ({ params }: { params: { id: string } }) => {
  const wing = await apiService.get(`/rooms/wings/${params.id}`);

  const backgroundStyle = [
    wing.name === "Bloodborn"
      ? "bg-[url('../public/background-red.png')]"
      : wing.name === "Haunted"
      ? "bg-[url('../public/background-blue.png')]"
      : wing.name === "Reborn"
      ? "bg-[url('../public/background-2.png')]"
      : "bg-[url('../public/background-purple.png')]",
  ];

  console.log(wing);
  console.log("Haunted Wing Image URL:", wing.image_url);

  return (
    <main className={`wrapper-main ${backgroundStyle} gap-20`}>
      <MotionDiv
        variants={fadeIn("down", "tween", 0.3, 0.7)}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        className='flex-center flex-col sm:w-[90%] max-w-[90%] md:w-[80%] md:max-w-[80%] pt-20'
      >
        <Image
          width={1000}
          height={1000}
          src={wing.image_url}
          alt={wing.name}
          className='object-cover object-center rounded-xl shadow-2xl overflow-hidden h-[50vh] md:h-[70vh] xl:h-[80vh]'
        />
      </MotionDiv>

      <MotionDiv
        variants={fadeIn("up", "tween", 0.3, 0.7)}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        className='flex-center flex-col text-center gap-6 md:max-w-[90%] lg:max-w-[80%]'
      >
        <h1 className='h2-bold font-germania tracking-wider border-b-4 border-white-main '>
          Welcome to the Realm of the {wing.name}
        </h1>
        <div className='p-regular-18 2xl:p-regular-20'>{wing.description}</div>
      </MotionDiv>

      <WingChambersList />

      {wing.name === "Bloodborn" ? (
        <BloodbornServices />
      ) : wing.name === "Arcane" ? (
        <ArcaneServices />
      ) : wing.name === "Reborn" ? (
        <RebornServices />
      ) : (
        <HauntedServices />
      )}
    </main>
  );
};

export async function generateMetadata({
  params: { id },
}: SearchParamProps): Promise<Metadata> {
  const wing = await apiService.get(`/rooms/wings/${id}`);

  return {
    title: `Wing of the ${wing.name} | Cryptwell Castle Resort`,
  };
}

export default WingDetailPage;
