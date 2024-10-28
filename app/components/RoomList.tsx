"use client";

import apiService from "../services/apiService";
import { useEffect, useState } from "react";
import RoomListItem from "./RoomListItem";

export type RoomType = {
  id: string;
  title: string;
  price_per_night: number;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  image_url: string;
};

const RoomList = () => {
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
    <>
      {rooms.map((room) => {
        return <RoomListItem key={room.id} room={room} />;
      })}
    </>
  );
};

export default RoomList;
