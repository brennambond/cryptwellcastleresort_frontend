"use client";

import { useState, useEffect, useCallback } from "react";
import ChambersListItem from "./ChambersListItem";
import useSearchModal from "../hooks/useSearchModal";
import { format } from "date-fns";
import apiService from "../services/apiService";
import { staggerContainer } from "@/utils/motion";
import MotionDiv from "@/components/motion/MotionDiv";

interface Chamber {
  id: string;
  title: string;
  price_per_night: number;
  image_url: string;
  wing: string;
  beds: number;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  category: string;
  availability_status: boolean;
}

const ChambersList: React.FC = () => {
  const searchModal = useSearchModal();
  const [chambers, setChambers] = useState<Chamber[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchChambers = useCallback(async () => {
    setLoading(true);
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
      if (guests) queryParams.append("guests", guests.toString());
      if (beds) queryParams.append("beds", beds.toString());
      if (bedrooms) queryParams.append("bedrooms", bedrooms.toString());
      if (bathrooms) queryParams.append("bathrooms", bathrooms.toString());
      if (checkIn) queryParams.append("checkIn", format(checkIn, "yyyy-MM-dd"));
      if (checkOut)
        queryParams.append("checkOut", format(checkOut, "yyyy-MM-dd"));
      if (category) queryParams.append("category", category);

      const response = await apiService.get(
        `/rooms/rooms/?${queryParams.toString()}`
      );

      console.log("Chambers API Response:", response);

      setChambers(response); // Directly set the response if it's an array
    } catch (error) {
      console.error("Failed to fetch chambers:", error);
    } finally {
      setLoading(false);
    }
  }, [searchModal.query]);

  useEffect(() => {
    fetchChambers();
  }, [fetchChambers]);

  return (
    <MotionDiv
      variants={staggerContainer}
      initial='hidden'
      whileInView='show'
      viewport={{ once: true }}
      className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 rounded-xl gap-8 lg:gap-10 xl:gap-12 sm:w-[90%] max-w-[90%]'
    >
      {loading ? (
        <p>Loading chambers...</p>
      ) : chambers.length > 0 ? (
        chambers.map((chamber, index) => (
          <ChambersListItem key={chamber.id} chamber={chamber} index={index} />
        ))
      ) : (
        <p>No chambers found.</p>
      )}
    </MotionDiv>
  );
};

export default ChambersList;
