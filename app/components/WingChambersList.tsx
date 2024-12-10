"use client";

import { format } from "date-fns";
import apiService from "../services/apiService";
import { useEffect, useState } from "react";
import useSearchModal from "../hooks/useSearchModal";
import ChambersListItem from "./ChambersListItem";

interface ChambersProps {
  chambersWing?: string;
}

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

const WingChambersList: React.FC<ChambersProps> = ({ chambersWing }) => {
  const searchModal = useSearchModal();
  const wing = chambersWing;
  const numGuests = searchModal.query.guests;
  const numBeds = searchModal.query.beds;
  const numBedrooms = searchModal.query.bedrooms;
  const numBathrooms = searchModal.query.bathrooms;
  const checkinDate = searchModal.query.checkIn;
  const checkoutDate = searchModal.query.checkOut;
  const category = searchModal.query.category;

  const [chambers, setChambers] = useState<ChamberType[]>([]);

  const getChambers = async () => {
    let url = "/api/rooms/";
    let urlQuery = "";

    if (wing) {
      urlQuery += "&wing=" + wing;
    }
    if (numGuests) {
      urlQuery += "&numGuests=" + numGuests;
    }
    if (numBeds) {
      urlQuery += "&numBeds=" + numBeds;
    }
    if (numBedrooms) {
      urlQuery += "&numBedrooms=" + numBedrooms;
    }
    if (numBathrooms) {
      urlQuery += "&numBathrooms=" + numBathrooms;
    }
    if (checkinDate) {
      urlQuery += "&checkin=" + format(checkinDate, "yyyy-MM-dd");
    }
    if (checkoutDate) {
      urlQuery += "&checkout=" + format(checkoutDate, "yyyy-MM-dd");
    }
    if (category) {
      urlQuery += "&category=" + category;
    }
    if (urlQuery.length) {
      urlQuery = "?" + urlQuery.substring(1);

      url += urlQuery;
    }

    const tmpChambers = await apiService.get(url);

    setChambers(
      tmpChambers.data.map((chamber: ChamberType) => {
        return chamber;
      })
    );
  };

  useEffect(() => {
    getChambers();
  }, [wing, searchModal.query]);

  return (
    <>
      {chambers.map((chamber) => {
        const index = chambers.indexOf(chamber);
        return (
          <ChambersListItem key={chamber.id} chamber={chamber} index={index} />
        );
      })}
    </>
  );
};

export default WingChambersList;