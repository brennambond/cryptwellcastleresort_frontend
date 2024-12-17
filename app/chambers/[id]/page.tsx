"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import apiService from "@/app/services/apiService";

import MotionDiv from "@/components/motion/MotionDiv";
import { fadeIn } from "@/utils/motion";
import ReservationSidebar, {
  Chamber,
} from "@/app/components/ReservationSidebar";

const ChamberDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [chamber, setChamber] = useState<Chamber | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const userId = null; // Replace this with your authentication logic.

  useEffect(() => {
    const fetchChamberDetails = async () => {
      try {
        const chamberData = await apiService.getChamberDetails(id);
        setChamber(chamberData);
      } catch (err) {
        console.error("Error fetching chamber details:", err);
        setError("Failed to load chamber details.");
      } finally {
        setLoading(false);
      }
    };

    fetchChamberDetails();
  }, [id]);

  if (loading) {
    return (
      <div className='flex-center min-h-screen'>
        <p className='text-lg font-semibold'>Loading chamber details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex-center min-h-screen'>
        <p className='text-lg font-semibold text-red-600'>{error}</p>
      </div>
    );
  }

  return (
    <main className='wrapper-main flex flex-col gap-16 bg-white-main py-10'>
      <MotionDiv
        variants={fadeIn("up", "tween", 0.3, 0.7)}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        className='flex-center flex-col gap-10 px-4'
      >
        <h1 className='h1-bold text-gray-900 font-germania tracking-wide border-b-4 border-gray-400 pb-4'>
          {chamber?.title}
        </h1>

        {/* Chamber Image */}
        <div className='relative w-full max-w-5xl h-[50vh] rounded-lg shadow-xl overflow-hidden'>
          {chamber?.id && (
            <Image
              src={chamber?.image_url}
              alt={`Image of ${chamber?.title}`}
              layout='fill'
              objectFit='cover'
              priority
            />
          )}
        </div>

        {/* Chamber Details */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-6xl'>
          <div className='col-span-2 space-y-6 text-gray-700'>
            <p className='p-medium-20'>
              <strong>Description:</strong> {chamber?.description}
            </p>
            <p className='p-medium-20'>
              <strong>Wing:</strong> {chamber?.wing}
            </p>
            <p className='p-medium-20'>
              <strong>Guests:</strong> Up to {chamber?.guests} guests
            </p>
            <p className='p-medium-20'>
              <strong>Nightly Price:</strong> ${chamber?.price_per_night}
            </p>
          </div>

          {/* Reservation Sidebar */}
          {chamber && <ReservationSidebar chamber={chamber} userId={userId} />}
        </div>
      </MotionDiv>
    </main>
  );
};

export default ChamberDetailPage;
