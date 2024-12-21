"use client";

import apiService from "../services/apiService";
import { useEffect, useState } from "react";
import ChambersListItem from "./ChambersListItem";
import MotionDiv from "@/components/motion/MotionDiv";
import { staggerContainer } from "@/utils/motion";
import { useParams } from "next/navigation";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChambers = async () => {
      try {
        const response = await apiService.get(`/rooms/wings/${wingId}/`);
        if (response?.rooms && Array.isArray(response.rooms)) {
          setChambers(response.rooms); // Extract rooms from the response
        } else {
          setChambers([]);
          console.warn("Unexpected response structure:", response);
        }
      } catch (error) {
        console.error("Error fetching chambers:", error);
        setChambers([]);
      } finally {
        setLoading(false);
      }
    };

    if (wingId) fetchChambers();
  }, [wingId]);

  if (loading) return <div>Loading chambers...</div>;

  if (chambers.length === 0) {
    return <div>No chambers available for this wing.</div>;
  }

  // const searchModal = useSearchModal();
  // const wing = chambersWing;
  // const numGuests = searchModal.query.guests;
  // const numBeds = searchModal.query.beds;
  // const numBedrooms = searchModal.query.bedrooms;
  // const numBathrooms = searchModal.query.bathrooms;
  // const checkinDate = searchModal.query.checkIn;
  // const checkoutDate = searchModal.query.checkOut;
  // const category = searchModal.query.category;

  // const [chambers, setChambers] = useState<ChamberType[]>([]);

  // const getChambers = async () => {
  //   let url = "/rooms/";
  //   let urlQuery = "";

  //   if (wing) {
  //     urlQuery += "&wing=" + wing;
  //   }
  //   if (numGuests) {
  //     urlQuery += "&numGuests=" + numGuests;
  //   }
  //   if (numBeds) {
  //     urlQuery += "&numBeds=" + numBeds;
  //   }
  //   if (numBedrooms) {
  //     urlQuery += "&numBedrooms=" + numBedrooms;
  //   }
  //   if (numBathrooms) {
  //     urlQuery += "&numBathrooms=" + numBathrooms;
  //   }
  //   if (checkinDate) {
  //     urlQuery += "&checkin=" + format(checkinDate, "yyyy-MM-dd");
  //   }
  //   if (checkoutDate) {
  //     urlQuery += "&checkout=" + format(checkoutDate, "yyyy-MM-dd");
  //   }
  //   if (category) {
  //     urlQuery += "&category=" + category;
  //   }
  //   if (urlQuery.length) {
  //     urlQuery = "?" + urlQuery.substring(1);

  //     url += urlQuery;
  //   }

  //   const tmpChambers = await apiService.get(url);

  //   setChambers(
  //     tmpChambers.data.map((chamber: ChamberType) => {
  //       return chamber;
  //     })
  //   );
  // };

  // useEffect(() => {
  //   getChambers();
  // }, [wing, searchModal.query]);

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
