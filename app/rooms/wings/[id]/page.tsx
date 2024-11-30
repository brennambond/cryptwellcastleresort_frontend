import RoomList from "@/app/components/RoomList";
import Wings from "@/app/components/Wings";
import WingsRoomList from "@/app/components/WingsRoomList";
import apiService from "@/app/services/apiService";
import Image from "next/image";
import React from "react";

const WingDetailPage = async ({ params }: { params: { id: string } }) => {
  const wing = await apiService.get(`/api/rooms/wings/${params.id}`);
  console.log(wing);
  return (
    <main className='max-w-[1500px] mx-auto px-6 '>
      <div className='w-full h-[64vh] overflow-hidden rounded-xl relative mb-4'>
        <Image
          fill
          src={wing.room.image_url.slice(5)}
          alt={wing.name}
          className='object-cover w-full h-full'
        />
      </div>

      <hr />
      <div className='mt-4 flex flex-col gap-6 '>
        <div>Wing of the {wing.name}</div>
        <div>{wing.description}</div>
        <div className='mt-4 grid grid-cols-1 md:grid-cols-3 gap-20 px-12 bg-white-main rounded-md py-8'>
          {" "}
          <WingsRoomList roomsWing={wing.id} />
        </div>
      </div>
    </main>
  );
};

export default WingDetailPage;
