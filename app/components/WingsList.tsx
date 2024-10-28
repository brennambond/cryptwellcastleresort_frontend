"use client";

import apiService from "../services/apiService";
import { useEffect, useState } from "react";
import WingListItem from "./WingsListItem";

export type WingType = {
  id: string;
  name: string;
  image_url: string;
};

const WingsList = () => {
  const [wings, setWings] = useState<WingType[]>([]);
  const getWings = async () => {
    const tmpWings = await apiService.get("/api/rooms/wings/");

    setWings(tmpWings.data);
    console.log(tmpWings);
  };

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
