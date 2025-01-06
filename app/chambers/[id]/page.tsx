"use client";

import MotionDiv from "@/components/motion/MotionDiv";
import { fadeIn } from "@/utils/motion";
import apiService from "@/app/services/apiService";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ReservationSidebar from "@/app/components/reservations/reservationsidebar/ReservationSidebar";
import { getCurrentUser } from "@/app/lib/actions";
import ChamberServices from "@/app/components/services/ChamberServices";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/Spinner";
import { getImageUrl } from "@/utils/config";

export type SearchParamProps = {
  params: { id: string };
};

const ChamberDetailPage: React.FC<SearchParamProps> = ({ params }) => {
  const [chamber, setChamber] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chamberData = await apiService.get(
          `${process.env.NEXT_PUBLIC_API_URL}/rooms/rooms/${params.id}`
        );
        setChamber(chamberData);

        const user = await getCurrentUser();
        setUserId(user?.id || null); // Safely handle null user
      } catch (error) {
        console.error("Error fetching data:", error);
        if (!chamber) {
          router.push("/404"); // Redirect only if chamber data is not found
        }
      }
    };

    fetchData();
  }, [params.id, router]);

  if (!chamber) {
    return (
      <div className='flex items-center justify-center w-full h-screen'>
        <Spinner size='md' color='text-gray-500' />
      </div>
    );
  }

  const getBackgroundStyle = (title: string): string => {
    if (title.startsWith("Bloodborn"))
      return "bg-[url('../public/background-red.png')]";
    if (title.startsWith("Haunted"))
      return "bg-[url('../public/background-blue.png')]";
    if (title.startsWith("Reborn"))
      return "bg-[url('../public/background-2.png')]";
    return "bg-[url('../public/background-purple.png')]"; // Default background
  };

  const backgroundStyle = getBackgroundStyle(chamber.title);

  return (
    <main
      className={`${backgroundStyle} font-cormorant text-white bg-cover bg-center`}
    >
      <div className='flex-center flex-col wrapper-main gap-20 p-medium-20'>
        <MotionDiv
          variants={fadeIn("down", "tween", 0.3, 0.7)}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true }}
          className='flex-center flex-col gap-16 sm:w-[90%] max-w-[90%] md:w-[80%] md:max-w-[80%]'
        >
          <h1 className='h2-medium font-germania tracking-wider mt-20 text-center'>
            {chamber.title}
          </h1>
          <Image
            width={1000}
            height={1000}
            src={chamber.image_url}
            alt={chamber.title}
            className='object-cover object-center rounded-xl shadow-2xl overflow-hidden h-[50vh] md:h-[60vh] xl:max-h-[60vh] xl:max-w-[60vw]'
          />
        </MotionDiv>

        <MotionDiv
          variants={fadeIn("up", "tween", 0.3, 0.7)}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true }}
          className='flex-center flex-col text-center gap-6 md:max-w-[90%] lg:max-w-[80%]'
        >
          <div className='flex-center flex-col'>
            <p className='backdrop-blur-[2px] drop-shadow-2xl mb-6 capitalize border-b-2 border-main-white p-bold-20 tracking-wide'>
              Up to {chamber.guests} {chamber.guests == 1 ? "guest" : "guests"}{" "}
              - {chamber.bedrooms}{" "}
              {chamber.bedrooms == 1 ? "bedroom" : "bedrooms"} -{" "}
              {chamber.bathrooms}{" "}
              {chamber.bathrooms == 1 ? "bathroom" : "bathrooms"}
            </p>

            <p className='backdrop-blur-[2px] drop-shadow-2xl max-w-[90%] lg:max-w-[80%]'>
              {chamber.description}
            </p>
          </div>

          <ReservationSidebar chamber={chamber} userId={userId} />

          <ChamberServices />
        </MotionDiv>
      </div>
    </main>
  );
};

export default ChamberDetailPage;
