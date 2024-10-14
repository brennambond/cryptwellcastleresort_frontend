"use client";

import { useEffect, useState } from "react";
import RoomListItem from "./RoomListItem";

export type RoomType = {
  id: string;
  title: string;
  price_per_night: number;
  image_url: string;
};

const RoomList = () => {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const getRooms = async () => {
    const url = "http://localhost:8000/api/rooms/";

    await fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("json", json);

        setRooms(json.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
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
