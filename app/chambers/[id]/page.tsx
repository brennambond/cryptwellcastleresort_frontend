"use client";

import MotionDiv from "@/components/motion/MotionDiv";
import { fadeIn } from "@/utils/motion";
import apiService from "@/app/services/apiService";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ReservationSidebar from "@/app/components/ReservationSidebar";
import { getUserId } from "@/app/lib/actions";
import ChamberServices from "@/app/components/services/ChamberServices";
import { useRouter } from "next/navigation";

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

        const id = await getUserId();
        console.log("Fetched userId in ChamberDetailPage:", id);
        setUserId(id);
      } catch (error) {
        console.error("Error fetching data:", error);
        router.push("/404"); // Redirect to a 404 page if the chamber doesn't exist
      }
    };

    fetchData();
  }, [params.id, router]);

  if (!chamber) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  const backgroundStyle = [
    chamber.wing_name === "Bloodborn"
      ? "bg-[url('../public/background-red.png')]"
      : chamber.wing_name === "Haunted"
      ? "bg-[url('../public/background-blue.png')]"
      : chamber.wing_name === "Reborn"
      ? "bg-[url('../public/background-2.png')]"
      : "bg-[url('../public/background-purple.png')]",
  ];

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
            src={chamber.image_url} // Use valid image_url from backend
            alt={chamber.title}
            className='object-cover object-center rounded-xl shadow-2xl overflow-hidden h-[50vh] md:h-[60vh] xl:max-h-[60vh] xl:max-w-[60vw]'
          />
        </MotionDiv>

        {/* Chamber Details */}
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
