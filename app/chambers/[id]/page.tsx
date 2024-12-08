import Image from "next/image";

import ReservationSidebar from "@/app/components/ReservationSidebar";

import apiService from "@/app/services/apiService";
import { getUserId } from "@/app/lib/actions";

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
    <main className={`wrapper-main ${backgroundStyle}`}>
      <div className='w-full h-[64vh] overflow-hidden rounded-xl relative mb-4'>
        <Image
          fill
          src={chamber.image_url.slice(5)}
          alt={chamber.title}
          className='object-cover w-full h-full shadow-2xl'
        />
      </div>

      <hr />

      <div className='grid grid-cols-1 md:grid-cols-5 gap-4 '>
        <div className='col-span-3 py-6 pr-6'>
          <h1 className='mb-4 text-4xl'>{chamber.title}</h1>
          <span className='mb-6 block text-lg text-gray-600'>
            {chamber.guests} {chamber.guests == 1 ? "guest" : "guests"} -{" "}
            {chamber.bedrooms} {chamber.bedrooms == 1 ? "bedroom" : "bedrooms"}{" "}
            - {chamber.bathrooms}{" "}
            {chamber.bathrooms == 1 ? "bathroom" : "bathrooms"}
          </span>

          <hr />

          <p className='mt-6 text-lg'>{chamber.description}</p>
        </div>

        <ReservationSidebar chamber={chamber} userId={userId} />
      </div>
    </main>
  );
};

export default ChamberDetailPage;
