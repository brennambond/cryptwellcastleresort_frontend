"use client";

import apiService from "../../services/apiService";
import ReservationCard from "./ReservationCard";
import MotionDiv from "@/components/motion/MotionDiv";
import { fadeIn } from "@/utils/motion";
import { useEffect, useState } from "react";
import { differenceInDays } from "date-fns";
import Spinner from "../Spinner";

interface Reservation {
  id: string;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
  room: {
    id: string;
    title: string;
    image_url: string;
    wing: {
      name: string;
    };
    price_per_night: number;
    guests: number;
  };
  number_of_nights: number;
}

const ReservationsPage: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await apiService.getReservations();
        console.log("Reservations API Response:", response);

        const reservationsWithNights = response.map((reservation: any) => ({
          ...reservation,
          number_of_nights: Math.max(
            differenceInDays(
              new Date(reservation.check_out),
              new Date(reservation.check_in)
            ),
            1
          ),
          room: {
            ...reservation.room,
            price_per_night: reservation.room.price_per_night || 0,
          },
        }));

        setReservations(reservationsWithNights);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);
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
      {loading ? (
        <Spinner size='md' color='text-gray-500' />
      ) : reservations.length ? (
        <div className='grid grid-cols-1 rounded-xl gap-8 lg:gap-10 xl:gap-12 sm:w-[80%] md:w-[70%] lg:w-[60%] 2xl:w-[50%] pt-10 pb-20 lg:pt-20'>
          {reservations.map((reservation, index) => (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div>You don't have any reservations.</div>
      )}
    </main>
  );
};

export default ReservationsPage;
