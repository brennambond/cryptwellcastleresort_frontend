import MotionDiv from "@/components/motion/MotionDiv";
import { fadeIn } from "@/utils/motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import EditReservationModal from "./EditReservationModal";
import DeleteReservationModal from "./DeleteReservationModal";
import apiService from "../services/apiService";
import { eachDayOfInterval } from "date-fns";

interface ReservationProps {
  reservation: {
    id: string;
    check_in: string;
    check_out: string;
    guests: number;
    total_price: number;
    number_of_nights: number;
    room: {
      id: string;
      title: string;
      image_url: string;
    };
    wing?: string; // Optional wing property
  };
  index: number;
}

const ReservationCard: React.FC<ReservationProps> = ({
  reservation,
  index,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);

  const wing = reservation.wing || "Default"; // Use a default if wing is missing

  const colorStyle =
    wing === "Bloodborn"
      ? "text-red-900"
      : wing === "Haunted"
      ? "text-cyan-900"
      : wing === "Reborn"
      ? "text-emerald-900"
      : "text-fuchsia-900";

  const buttonColorStyle =
    wing === "Bloodborn"
      ? "bg-red-900 hover:bg-red-800"
      : wing === "Haunted"
      ? "bg-cyan-900 hover:bg-cyan-800"
      : wing === "Reborn"
      ? "bg-emerald-900 hover:bg-emerald-800"
      : "bg-fuchsia-950 hover:bg-fuchsia-900";

  const fetchBookedDates = async () => {
    try {
      const response = await apiService.get(
        `/rooms/rooms/${reservation.room.id}/reservations/`
      );
      const dates = response.flatMap((res: any) =>
        eachDayOfInterval({
          start: new Date(res.check_in),
          end: new Date(res.check_out),
        })
      );
      setBookedDates(dates);
    } catch (error) {
      console.error("Failed to fetch booked dates:", error);
    }
  };

  const handleEditClick = async () => {
    await fetchBookedDates();
    setIsEditModalOpen(true);
  };

  return (
    <MotionDiv
      variants={fadeIn("right", "tween", (index + 1) * 0.5, 0.75)}
      initial='hidden'
      whileInView='show'
      viewport={{ once: true }}
      className='bg-white-main rounded-xl flex flex-col gap-2 text-gray-800 z-[50]'
      key={reservation.id}
    >
      <Image
        src={reservation.room.image_url}
        width={1000}
        height={1000}
        className='object-cover object-center overflow-hidden aspect-square rounded-t-xl max-h-[250px]'
        alt='Reservation Chamber Image'
      />

      <div className='flex flex-col items-start justify-center px-6 py-4 gap-2 p-regular-18'>
        <h2
          className={`pb-4 p-regular-20 lg:p-regular-24 underline font-germania self-center ${colorStyle}`}
        >
          {reservation.room.title}
        </h2>
        <p className='pb-2 lg:p-regular-20'>
          <strong className='underline'>Check-in date:</strong>{" "}
          {reservation.check_in}
        </p>
        <p className='pb-2 lg:p-regular-20'>
          <strong className='underline'>Check-out date:</strong>{" "}
          {reservation.check_out}
        </p>
        <p className='pb-2 lg:p-regular-20'>
          <strong className='underline'>Number of nights:</strong>{" "}
          {reservation.number_of_nights}
        </p>
        <p className='pb-2 lg:p-regular-20'>
          <strong className='underline'>Number of guests:</strong>{" "}
          {reservation.guests}
        </p>
        <p className='pb-2 lg:p-regular-20'>
          <strong className='underline'>Total price:</strong> $
          {reservation.total_price}
        </p>

        <div className='flex justify-between w-full mt-4'>
          <button
            onClick={handleEditClick}
            className={`button-main-nobg ${buttonColorStyle}`}
          >
            Edit
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className={`button-main-nobg ${buttonColorStyle}`}
          >
            Delete
          </button>
        </div>
      </div>

      {isEditModalOpen && (
        <EditReservationModal
          reservation={reservation}
          onClose={() => setIsEditModalOpen(false)}
          bookedDates={bookedDates}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteReservationModal
          reservationId={reservation.id}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
    </MotionDiv>
  );
};

export default ReservationCard;
