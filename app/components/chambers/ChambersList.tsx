import { useState, useEffect, useCallback } from "react";
import ChambersListItem from "./ChambersListItem";
import { format } from "date-fns";
import apiService from "../../services/apiService";
import { staggerContainer } from "@/utils/motion";
import MotionDiv from "@/components/motion/MotionDiv";
import Spinner from "../Spinner";

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

const ChambersList: React.FC<{ searchQuery: any }> = ({ searchQuery }) => {
  const [chambers, setChambers] = useState<Chamber[]>([]);
  const [hasFetched, setHasFetched] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchChambers = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();

      if (searchQuery.wing) queryParams.append("wing", searchQuery.wing);
      if (searchQuery.guests)
        queryParams.append("guests", searchQuery.guests.toString());
      if (searchQuery.beds)
        queryParams.append("beds", searchQuery.beds.toString());
      if (searchQuery.bedrooms)
        queryParams.append("bedrooms", searchQuery.bedrooms.toString());
      if (searchQuery.bathrooms)
        queryParams.append("bathrooms", searchQuery.bathrooms.toString());
      if (searchQuery.checkIn)
        queryParams.append(
          "checkIn",
          format(searchQuery.checkIn, "yyyy-MM-dd")
        );
      if (searchQuery.checkOut)
        queryParams.append(
          "checkOut",
          format(searchQuery.checkOut, "yyyy-MM-dd")
        );
      if (searchQuery.category)
        queryParams.append("category", searchQuery.category);

      console.log("Query parameters sent to API:", queryParams.toString());

      const response = await apiService.get(
        `/rooms/rooms/?${queryParams.toString()}`
      );

      console.log("Chambers API Response:", response);

      setChambers(response);
    } catch (error) {
      console.error("Failed to fetch chambers:", error);
    } finally {
      setLoading(false);
      setHasFetched(true);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchChambers();
  }, [fetchChambers]);

  if (loading) {
    return (
      <div className='flex items-center justify-center w-full h-[300px]'>
        <Spinner size='md' color='text-gray-500' />
      </div>
    );
  }

  return (
    <MotionDiv
      variants={staggerContainer}
      initial='hidden'
      whileInView='show'
      viewport={{ once: true }}
      className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 rounded-xl gap-8 lg:gap-10 xl:gap-12 sm:w-[90%] max-w-[90%]'
    >
      {chambers.length > 0 ? (
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
