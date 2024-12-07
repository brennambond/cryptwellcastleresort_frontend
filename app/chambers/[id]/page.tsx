import ReservationSidebar from "@/app/components/ReservationSidebar";
import Image from "next/image";

import apiService from "@/app/services/apiService";
import { getUserId } from "@/app/lib/actions";
import Link from "next/link";

const ChamberDetailPage = async ({ params }: { params: { id: string } }) => {
  const room = await apiService.get(`/api/rooms/${params.id}`);
  const userId = await getUserId();

  return (
    <main className="wrapper-main bg-[url('../public/background-blue.png')]">
      <div className='w-full h-[64vh] overflow-hidden rounded-xl relative mb-4'>
        <Image
          fill
          src={room.image_url.slice(5)}
          alt={room.title}
          className='object-cover w-full h-full'
        />
      </div>

      <hr />

      <Link
        href={`/rooms/wings/${room.wing}`}
        className='py-6 flex items-center space-x-4'
      >
        Wing
      </Link>

      <hr />

      <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
        <div className='col-span-3 py-6 pr-6'>
          <h1 className='mb-4 text-4xl'>{room.title}</h1>
          <span className='mb-6 block text-lg text-gray-600'>
            {room.guests} {room.guests == 1 ? "guest" : "guests"} -{" "}
            {room.bedrooms} {room.bedrooms == 1 ? "bedroom" : "bedrooms"} -{" "}
            {room.bathrooms} {room.bathrooms == 1 ? "bathroom" : "bathrooms"}
          </span>

          <hr />

          <p className='mt-6 text-lg'>{room.description}</p>
        </div>

        <ReservationSidebar room={room} userId={userId} />
      </div>
    </main>
  );
};

export default ChamberDetailPage;