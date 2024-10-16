"use client";

import WingsList from "@/app/components/WingsList";
import apiService from "../../services/apiService";
import { useEffect, useState } from "react";

export type RoomType = {
  id: string;
  title: string;
  price_per_night: number;
  image_url: string;
  hotel_wing: string;
};

const WingsPage = () => {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const getRooms = async () => {
    const tmpRooms = await apiService.get("/api/rooms/");

    setRooms(tmpRooms.data);
  };

  console.log(rooms);

  useEffect(() => {
    getRooms();
  }, []);
  return (
    <main className='max-w-[1500px] mx-auto px-6 '>
      <div className='mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 '>
        <WingsList />
      </div>
    </main>
  );
};

export default WingsPage;
