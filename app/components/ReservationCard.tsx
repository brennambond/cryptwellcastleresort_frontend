import MotionDiv from "@/components/motion/MotionDiv";
import { fadeIn } from "@/utils/motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ReservationProps {
  reservation: any;
  index: number;
}

const ReservationCard: React.FC<ReservationProps> = ({
  reservation,
  index,
}) => {
  var reservationWingTitle = reservation.room.title.split(" ")[0].toString();
  const colorStyle = [
    reservationWingTitle === "Bloodborn"
      ? "text-red-900"
      : reservationWingTitle === "Haunted"
      ? "text-cyan-900"
      : reservationWingTitle === "Reborn"
      ? "text-emerald-900"
      : "text-fuchsia-900",
  ];

  const buttonColorStyle = [
    reservationWingTitle === "Bloodborn"
      ? "bg-red-900 hover:bg-red-800"
      : reservationWingTitle === "Haunted"
      ? "bg-cyan-900 hover:bg-cyan-800"
      : reservationWingTitle === "Reborn"
      ? "bg-emerald-900 hover:bg-emerald-800"
      : "bg-fuchsia-950 hover:bg-fuchsia-900",
  ];
  const chamber_imageurl =
    "https://hauntedhotel-backend-bucket" +
    reservation.room.image_url.slice(17);

  return (
    <MotionDiv
      variants={fadeIn("right", "tween", (index + 1) * 0.5, 0.75)}
      initial='hidden'
      whileInView='show'
      viewport={{ once: true }}
      className='bg-white-main rounded-xl flex flex-col gap-2 text-gray-800'
      key={reservation.id}
    >
      <Image
        src={chamber_imageurl}
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
          <strong className='underline'>Check in date:</strong>{" "}
          {reservation.start_date}
        </p>
        <p className='pb-2 lg:p-regular-20'>
          <strong className='underline'>Check out date:</strong>{" "}
          {reservation.end_date}
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

        <Link
          href={`/chambers/${reservation.room.id}`}
          className={`button-main-nobg xl:my-4 self-center ${buttonColorStyle}`}
        >
          Go to room
        </Link>
      </div>
    </MotionDiv>
  );
};

export default ReservationCard;
