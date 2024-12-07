import { useRouter } from "next/navigation";
import { WingType } from "./WingsList";
import Image from "next/image";

interface WingProps {
  wing: WingType;
}

const WingListItem: React.FC<WingProps> = ({ wing }) => {
  const router = useRouter();
  const wing_image = wing.image_url.slice(5);
  console.log(wing);
  return (
    <div
      onClick={() => router.push(`/wings/${wing.id}`)}
      className='cursor-pointer flex flex-col items-center justify-center'
    >
      <div className='relative overflow-hidden aspect-square rounded-xl shadow-xl hover:shadow-2xl w-[200px] h-[200px]'>
        <Image
          fill
          src={wing_image}
          className='hover:scale-110 object-cover transition h-full w-full'
          alt='Hotel Picture'
        />
      </div>

      <div className='mt-2'>
        <p className='text-lg font-bold'>{wing.name}</p>
      </div>
    </div>
  );
};

export default WingListItem;
