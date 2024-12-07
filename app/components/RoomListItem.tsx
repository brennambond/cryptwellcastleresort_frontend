"use client";

import Image from "next/image";
import { RoomType } from "./RoomList";
import { useState } from "react";
import Link from "next/link";
import { HiMiniArrowRightCircle } from "react-icons/hi2";

interface RoomProps {
  room: RoomType;
}

const RoomListItem: React.FC<RoomProps> = ({ room }) => {
  var roomTitle = room.title.split(" ")[0].toString();
  const colorStyle = [
    roomTitle === "Bloodborn"
      ? "text-red-700 hover:text-red-900"
      : roomTitle === "Haunted"
      ? "text-cyan-700 hover:text-cyan-900"
      : roomTitle === "Reborn"
      ? "text-emerald-700 hover:text-emerald-900"
      : "text-purple-700 hover:text-purple-900",
  ];

  return (
    <div className='bg-white-main rounded-xl flex flex-col container'>
      <Image
        src={room.image_url.slice(5)}
        className='object-cover object-center overflow-hidden aspect-square rounded-t-xl max-h-[250px]'
        alt='Hotel Picture'
        height={1000}
        width={1000}
      />

      <div className='flex flex-col gap-2 py-4 px-6'>
        <Link
          href={`/chambers/${room.id}`}
          className={`cursor-pointer text-lg flex items-center gap-2 text-em ${colorStyle}`}
        >
          <HiMiniArrowRightCircle className='w-6 h-6' />
          <h3 className='p-regular-18 font-germania'>{room.title}</h3>
        </Link>

        <div className='flex justify-between items-center p-semibold-18 font-cormorant'>
          <p>
            <strong>${room.price_per_night}</strong> per night
          </p>
          <p className='p-semibold-16'>Capacity for {room.guests} Guests</p>
        </div>
      </div>
    </div>
  );
};

export default RoomListItem;
