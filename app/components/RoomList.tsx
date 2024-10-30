"use client";

import { format } from "date-fns";
import apiService from "../services/apiService";
import { useEffect, useState } from "react";
import useSearchModal from "../hooks/useSearchModal";
import RoomListItem from "./RoomListItem";
import { useSearchParams } from "next/navigation";

export type RoomType = {
  id: string;
  title: string;
  price_per_night: number;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  image_url: string;
};

const RoomList = () => {
  // const params = useSearchParams();
  const searchModal = useSearchModal();

  const wing = searchModal.query.wing;
  const numGuests = searchModal.query.guests;
  const numBeds = searchModal.query.beds;
  const numBedrooms = searchModal.query.bedrooms;
  const numBathrooms = searchModal.query.bathrooms;
  const checkinDate = searchModal.query.checkIn;
  const checkoutDate = searchModal.query.checkOut;
  const category = searchModal.query.category;

  const [rooms, setRooms] = useState<RoomType[]>([]);

  const getRooms = async () => {
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
      console.log("Query: ", urlQuery);

      urlQuery = "?" + urlQuery.substring(1);

      url += urlQuery;
    }

    const tmpRooms = await apiService.get(url);

    setRooms(
      tmpRooms.data.map((room: RoomType) => {
        return room;
      })
    );
  };

  useEffect(() => {
    getRooms();
  }, [category, searchModal.query]);

  return (
    <>
      {rooms.map((room) => {
        return <RoomListItem key={room.id} room={room} />;
      })}
    </>
  );
};

export default RoomList;
