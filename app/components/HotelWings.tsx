import { GiBat, GiGhost, GiWerewolf, GiShamblingZombie } from "react-icons/gi";

interface HotelWingsProps {
  dataWing?: string;
  setWing?: (wing: string) => void;
}

const HotelWings: React.FC<HotelWingsProps> = ({ dataWing, setWing }) => {
  return (
    <div className='pt-3 cursor-pointer pb-6 flex items-center space-x-12'>
      Delete Later
    </div>
  );
};

export default HotelWings;

// What this looks like when we call it in another component:

// const [dataWing, setDataWing] = useState('')
// const setWing = (wing: string) => {
//      setDataWing(wing)
// }

// <HotelWings dataWing={dataWing} setWing={(wing) => setWing(wing)} />
