"use client";

import Image from "next/image";
import { HiOutlineDuplicate } from "react-icons/hi";
import { RoomType } from "./RoomList";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface RoomProps {
  room: RoomType;
}

const RoomListItem: React.FC<RoomProps> = ({ room }) => {
  const [isHovering, setIsHovering] = useState(false);
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/rooms/${room.id}`)}
      className='cursor-pointer'
    >
      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className='relative overflow-hidden aspect-square rounded-xl shadow-xl hover:shadow-2xl flex items-center justify-center'
      >
        {isHovering ? (
          <div className='flex absolute bg-gray-600 text-white w-[40px] h-[40px] items-center justify-center rounded-md z-10  border-white border-2'>
            <HiOutlineDuplicate className='w-6 h-6' />
          </div>
        ) : (
          ""
        )}
        <Image
          fill
          src={room.image_url}
          sizes='(max-width: 768px) 768px, (max-width: 1200px): 768px, 768px'
          className={` ${
            isHovering ? "opacity-50" : "opacity-100"
          } object-cover transition h-full w-full relative`}
          alt='Hotel Picture'
        />
      </div>

      <div className='mt-2'>
        <p className='text-lg font-bold'>{room.title}</p>
      </div>

      <div className='mt-2'>
        <p className='text-sm text-gray-500'>
          <strong>${room.price_per_night}</strong> per night
        </p>
      </div>
    </div>
  );
};

export default RoomListItem;
