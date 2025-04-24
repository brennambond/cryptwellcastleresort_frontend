"use client";

import apiService from "../../services/apiService";
import { useEffect, useState } from "react";
import ChambersListItem from "../chambers/ChambersListItem";
import MotionDiv from "@/components/motion/MotionDiv";
import { staggerContainer } from "@/utils/motion";
import { useParams } from "next/navigation";
import Spinner from "../Spinner";

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

const WingChambersList = () => {
  const { id: wingId } = useParams(); // Extract wingId from the URL
  const [chambers, setChambers] = useState<ChamberType[]>([]); // Explicitly type as ChamberType[]
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchChambers = async () => {
      try {
        const response = await apiService.get("/rooms/rooms/");
        const filteredChambers = response.filter(
          (chamber: ChamberType) => chamber.wing === wingId
        );
        setChambers(filteredChambers);
      } catch (error) {
        console.error("Error fetching chambers:", error);
        setChambers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchChambers();
  }, [wingId]);

  if (loading) return <Spinner size='md' color='text-gray-500' />;
  if (chambers.length === 0)
    return <div>No chambers available for this wing.</div>;

  return (
    <MotionDiv
      variants={staggerContainer}
      initial='hidden'
      whileInView='show'
      viewport={{ once: true }}
      className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 rounded-xl gap-8 lg:gap-10 xl:gap-12 sm:w-[90%] max-w-[90%]'
    >
      {chambers.map((chamber) => {
        const index = chambers.indexOf(chamber);
        return (
          <ChambersListItem key={chamber.id} chamber={chamber} index={index} />
        );
      })}
    </MotionDiv>
  );
};

export default WingChambersList;
