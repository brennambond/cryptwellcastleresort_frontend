"use client";

import apiService from "../services/apiService";
import { useEffect, useState } from "react";
import WingListItem from "./WingsListItem";

interface UserProps {
  userId: string | null;
}

export type WingType = {
  id: string;
  name: string;
  image_url: string;
};

const WingsList: React.FC<UserProps> = ({ userId }) => {
  const [wings, setWings] = useState<WingType[]>([]);
  const getWings = async () => {
    const tmpWings = await apiService.get("/api/rooms/wings/");

    setWings(tmpWings.data);
  };

  useEffect(() => {
    getWings();
  }, []);

  return (
    <>
      {wings.map((wing) => {
        return <WingListItem key={wing.id} wing={wing} />;
      })}
    </>
  );
};

export default WingsList;
