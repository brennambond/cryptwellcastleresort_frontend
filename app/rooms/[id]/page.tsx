import ReservationSidebar from "@/app/components/ReservationSidebar";
import Image from "next/image";

import apiService from "@/app/services/apiService";

const RoomDetailPage = async ({ params }: { params: { id: string } }) => {
  const room = await apiService.get(`/api/rooms/${params.id}`);
  return (
    <main className='max-w-[1500px] mx-auto px-6 pb-6'>
      <div className='w-full h-[64vh] overflow-hidden rounded-xl relative mb-4'>
        <Image
          fill
          src='/hotel1.png'
          alt='Hotel Image'
          className='object-cover w-full h-full'
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
        <div className='col-span-3 py-6 pr-6'>
          <h1 className='mb-4 text-4xl'>{room.title}</h1>
          <span className='mb-6 block text-lg text-gray-600'>
            {room.guests} {room.guests == 1 ? "guest" : "guests"} -{" "}
            {room.bedrooms} {room.bedrooms == 1 ? "bedroom" : "bedrooms"} -{" "}
            {room.bathrooms} {room.bathrooms == 1 ? "bathroom" : "bathrooms"}
          </span>

          <hr />

          <div className='py-6 flex items-center space-x-4'>
            {room.landlord.avatar_url && (
              <Image
                src='/profile-pic.jpg'
                width={50}
                height={50}
                className='rounded-full'
                alt='User Icon'
              />
            )}

            <p>
              <strong>{room.landlord.name}</strong> is your host
            </p>
          </div>

          <hr />

          <p className='mt-6 text-lg'>{room.description}</p>
        </div>

        <ReservationSidebar room={room} />
      </div>
    </main>
  );
};

export default RoomDetailPage;
