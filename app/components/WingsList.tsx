"use client";

import apiService from "../services/apiService";
import { useEffect, useState } from "react";
import RoomListItem from "./RoomListItem";

export type WingType = {
  name: string;
};

const WingsList = () => {
  const [wings, setWings] = useState<WingType[]>([]);
  const getWings = async () => {
    const tmpWings = await apiService.get("/api/rooms/wings");

    setWings(tmpWings.data);
  };

  console.log(wings);

  useEffect(() => {
    getWings();
  }, []);

  return <>Test</>;
};

export default WingsList;

// What this looks like when we call it in another component:

// const [dataWing, setDataWing] = useState('')
// const setWing = (wing: string) => {
//      setDataWing(wing)
// }

// <HotelWings dataWing={dataWing} setWing={(wing) => setWing(wing)} />
