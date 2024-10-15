"use client";

import apiService from "../services/apiService";
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
  return <div>WingsPage</div>;
};

export default WingsPage;
