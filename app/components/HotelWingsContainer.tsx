"use client";

import { useState } from "react";
import HotelWings from "./HotelWings";

const HotelWingsContainer = () => {
  const [dataWing, setDataWing] = useState("");
  const setWing = (wing: string) => {
    setDataWing(wing);
  };
  return <HotelWings dataWing={dataWing} setWing={(wing) => setWing(wing)} />;
};

export default HotelWingsContainer;
