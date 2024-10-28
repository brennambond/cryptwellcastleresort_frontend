import { useRouter } from "next/navigation";
import { WingType } from "./WingsList";

interface WingProps {
  wing: WingType;
}

const WingListItem: React.FC<WingProps> = ({ wing }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/rooms/wings/${wing.id}`)}
      className='cursor-pointer'
    >
      {wing.name}
    </div>
  );
};

export default WingListItem;
