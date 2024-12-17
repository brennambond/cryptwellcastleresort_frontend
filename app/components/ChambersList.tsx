"use client";

import MotionDiv from "@/components/motion/MotionDiv";
import { staggerContainer } from "@/utils/motion";
import { useSearchParams } from "next/navigation";
import useSearchModal from "../hooks/useSearchModal";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import apiService from "../services/apiService";
import ChambersListItem from "./ChambersListItem";

export type ChamberType = {
  id: string;
  title: string;
  price_per_night: number;
  beds: number;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  image_url: string;
  wing: string;
  category: string;
};

const ChambersList: React.FC = () => {
  const params = useSearchParams();
  const searchModal = useSearchModal();
  const [chambers, setChambers] = useState<ChamberType[]>([]);

  const fetchChambers = async () => {
    try {
      const queryParams = new URLSearchParams();
      const {
        wing,
        guests,
        beds,
        bedrooms,
        bathrooms,
        checkIn,
        checkOut,
        category,
      } = searchModal.query;

      if (wing) queryParams.append("wing", wing);
      if (guests) queryParams.append("numGuests", guests.toString());
      if (beds) queryParams.append("numBeds", beds.toString());
      if (bedrooms) queryParams.append("numBedrooms", bedrooms.toString());
      if (bathrooms) queryParams.append("numBathrooms", bathrooms.toString());
      if (checkIn) queryParams.append("checkin", format(checkIn, "yyyy-MM-dd"));
      if (checkOut)
        queryParams.append("checkout", format(checkOut, "yyyy-MM-dd"));
      if (category) queryParams.append("category", category);

      const chambersData = await apiService.getChambers(`?${queryParams}`);
      setChambers(chambersData);
    } catch (error) {
      console.error("Failed to fetch chambers:", error);
    }
  };

  useEffect(() => {
    fetchChambers();
  }, [searchModal.query, params]);

  return (
    <MotionDiv
      variants={staggerContainer}
      initial='hidden'
      whileInView='show'
      viewport={{ once: true }}
      className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 rounded-xl gap-8 lg:gap-10 xl:gap-12 sm:w-[90%] max-w-[90%]'
    >
      {chambers.map((chamber, index) => (
        <ChambersListItem key={chamber.id} chamber={chamber} index={index} />
      ))}
    </MotionDiv>
  );
};

export default ChambersList;
