"use client";

import apiService from "../services/apiService";

import ReservationCard from "../components/ReservationCard";
import MotionDiv from "@/components/motion/MotionDiv";
import { fadeIn } from "@/utils/motion";
import { Metadata } from "next";
import { useEffect, useState } from "react";

export const metadata: Metadata = {
  title: "My Reservations | Cryptwell Castle Resort",
};

interface Reservation {
  id: string;
  start_date: string;
  end_date: string;
  guests: number;
  total_price: number;
  room: {
    id: string;
    title: string;
    image_url: string;
  };
}
interface MyReservationsPageProps {
  reservations: Reservation[];
}

const MyReservationsPage: React.FC<MyReservationsPageProps> = ({
  reservations,
}) => {
  console.log(reservations);
  return (
    <main className="wrapper-main bg-[url('../public/background-blue.png')]">
      <MotionDiv
        variants={fadeIn("up", "tween", 0.3, 0.7)}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
      >
        <h1 className='flex-center h2-bold md:h1-bold font-germania tracking-wider border-b-4 border-white-main my-10'>
          My Reservations
        </h1>
      </MotionDiv>
      {reservations.length ? (
        <div className='grid grid-cols-1 rounded-xl gap-8 lg:gap-10 xl:gap-12 sm:w-[80%] md:w-[70%] lg:w-[60%] 2xl:w-[50%] pt-10 pb-20 lg:pt-20'>
          {reservations.map((reservation) => {
            const index = reservations.indexOf(reservation);
            return (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
                index={index}
              />
            );
          })}
        </div>
      ) : (
        <div>You don't have any reservations</div>
      )}
    </main>
  );
};

export default MyReservationsPage;
