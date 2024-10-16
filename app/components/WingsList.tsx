"use client";

import apiService from "../services/apiService";
import { useEffect, useState } from "react";
import RoomListItem from "./RoomListItem";
import WingListItem from "./WingsListItem";

export type WingType = {
  id: string;
  name: string;
};

const WingsList = () => {
  const [wings, setWings] = useState<WingType[]>([]);
  const getWings = async () => {
    const tmpWings = await apiService.get("/api/rooms/wings");

    setWings(tmpWings.data);
  };

  const myWings = wings;

  console.log(wings);

  useEffect(() => {
    getWings();
  }, []);

  return (
    <>
      <div className='flex items-center space-x-6'>
        {wings.map((wing) => {
          return <WingListItem key={wing.id} wing={wing} />;
        })}
      </div>
    </>
  );
};

export default WingsList;

// What this looks like when we call it in another component:

// const [dataWing, setDataWing] = useState('')
// const setWing = (wing: string) => {
//      setDataWing(wing)
// }

// <HotelWings dataWing={dataWing} setWing={(wing) => setWing(wing)} />
