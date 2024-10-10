"use client";

import apiService from "../services/apiService";
import { useEffect, useState } from "react";
import RoomListItem from "./RoomListItem";

export type RoomType = {
  id: string;
  title: string;
  image_url: string;
  price_per_night: number;
};

const RoomList = () => {
  const [rooms, setRooms] = useState<RoomType[]>([]);

  const getRooms = async () => {
    const tmpRooms = await apiService.get("/api/rooms/");

    setRooms(tmpRooms.data);
  };

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
