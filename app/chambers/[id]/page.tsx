import Image from "next/image";

import ReservationSidebar from "@/app/components/ReservationSidebar";
import ChamberServices from "@/app/components/ChamberServices";

import apiService from "@/app/services/apiService";
import { getUserId } from "@/app/lib/actions";

import MotionDiv from "@/components/motion/MotionDiv";
import { fadeIn } from "@/utils/motion";

const ChamberDetailPage = async ({ params }: { params: { id: string } }) => {
  const chamber = await apiService.get(`/api/rooms/${params.id}`);
  const userId = await getUserId();

  var chamberWing = chamber.title.split(" ")[0].toString();
  const backgroundStyle = [
    chamberWing === "Bloodborn"
      ? "bg-[url('../public/background-red.png')]"
      : chamberWing === "Haunted"
      ? "bg-[url('../public/background-blue.png')]"
      : chamberWing === "Reborn"
      ? "bg-[url('../public/background-2.png')]"
      : "bg-[url('../public/background-purple.png')]",
  ];

  return (
    <main
      className={`${backgroundStyle} font-cormorant text-white bg-cover bg-center`}
    >
      <div className='flex-center flex-col wrapper-main gap-20 p-medium-20'>
        <MotionDiv
          variants={fadeIn("up", "tween", 0.3, 0.7)}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true }}
          className='flex-center flex-col gap-16 sm:w-[90%] max-w-[90%] md:w-[80%] md:max-w-[80%] '
        >
          <h1 className='h2-medium font-germania tracking-wider mt-20 text-center'>
            {chamber.title}
          </h1>
          <Image
            width={1000}
            height={1000}
            src={chamber.image_url.slice(5)}
            alt={chamber.title}
            className='object-cover object-center rounded-xl shadow-2xl overflow-hidden h-[50vh] md:h-[60vh] xl:max-h-[60vh] xl:max-w-[60vw]'
          />
        </MotionDiv>

        <div className='flex-center flex-col'>
          <p className='backdrop-blur-[2px] drop-shadow-2xl mb-6 capitalize border-b-2 border-main-white p-bold-20 tracking-wide'>
            Up to {chamber.guests} {chamber.guests == 1 ? "guest" : "guests"} -{" "}
            {chamber.bedrooms} {chamber.bedrooms == 1 ? "bedroom" : "bedrooms"}{" "}
            - {chamber.bathrooms}{" "}
            {chamber.bathrooms == 1 ? "bathroom" : "bathrooms"}
          </p>

          <p className='backdrop-blur-[2px] drop-shadow-2xl max-w-[90%] lg:max-w-[80%]'>
            {chamber.description}
          </p>
        </div>
        <ReservationSidebar chamber={chamber} userId={userId} />
        <ChamberServices />
      </div>
    </main>
  );
};

export default ChamberDetailPage;
