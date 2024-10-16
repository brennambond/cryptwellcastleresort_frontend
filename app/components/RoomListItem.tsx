import Image from "next/image";
import { RoomType } from "./RoomList";
import { useRouter } from "next/navigation";

interface RoomProps {
  room: RoomType;
}

const RoomListItem: React.FC<RoomProps> = ({ room }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/rooms/${room.id}`)}
      className='cursor-pointer'
    >
      <div className='relative overflow-hidden aspect-square rounded-xl shadow-xl hover:shadow-2xl'>
        <Image
          fill
          src={room.image_url}
          sizes='(max-width: 768px) 768px, (max-width: 1200px): 768px, 768px'
          className='hover:scale-110 object-cover transition h-full w-full'
          alt='Hotel Picture'
        />
      </div>

      <div className='mt-2'>
        <p className='text-lg font-bold'>{room.title}</p>
      </div>

      <div className='mt-2'>
        <p className='text-sm text-gray-500'>
          <strong>${room.price_per_night}</strong> per night
        </p>
      </div>
    </div>
  );
};

export default RoomListItem;
