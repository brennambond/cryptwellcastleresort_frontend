import apiService from "../services/apiService";

import ReservationCard from "../components/ReservationCard";
import MotionDiv from "@/components/motion/MotionDiv";
import { fadeIn } from "@/utils/motion";

const MyReservationsPage = async () => {
  const reservations = await apiService.get("/api/auth/myreservations/");
  return (
    <main className="wrapper-main bg-[url('../public/background-blue.png')]">
      <MotionDiv
        variants={fadeIn("up", "tween", 0.3, 0.7)}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
      >
        <h1 className='flex-center h2-bold md:h1-bold font-germania tracking-wider border-b-4 border-white-main my-10'>
          My Reservations
        </h1>
      </MotionDiv>
      <div className='grid grid-cols-1 rounded-xl gap-8 lg:gap-10 xl:gap-12 sm:w-[80%] md:w-[70%] lg:w-[60%] 2xl:w-[50%] pt-10 pb-20 lg:pt-20'>
        {reservations.map((reservation: any) => {
          const index = reservations.indexOf(reservation);
          return (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              index={index}
            />
          );
        })}
      </div>
    </main>
  );
};

export default MyReservationsPage;
