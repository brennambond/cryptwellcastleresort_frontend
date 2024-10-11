import { GiBat, GiGhost, GiWerewolf, GiShamblingZombie } from "react-icons/gi";

interface HotelWingsProps {
  dataWing?: string;
  setWing?: (wing: string) => void;
}

const HotelWings: React.FC<HotelWingsProps> = ({ dataWing, setWing }) => {
  return (
    <div className='pt-3 cursor-pointer pb-6 flex items-center space-x-12'>
      <div
        onClick={() => {
          setWing("Vampires"), console.log("Vampires");
        }}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2  ${
          dataWing == "Vampires" ? "border-gray-800" : "border-white"
        } hover:border-airbnb-dark hover:text-airbnb-dark opacity-80 hover:opacity-100`}
      >
        <GiBat
          className={`w-8 h-8 ${
            dataWing == "Vampires" ? "text-airbnb-dark" : ""
          }`}
        />
        <span className='text-xs font-semibold'>Vampires</span>
      </div>

      <div
        onClick={() => {
          setWing("Ghosts"), console.log("Ghosts");
        }}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2  ${
          dataWing == "Ghosts" ? "border-gray-800" : "border-white"
        } hover:border-airbnb-dark hover:text-airbnb-dark opacity-80 hover:opacity-100`}
      >
        <GiGhost
          className={`w-8 h-8 ${
            dataWing == "Ghosts" ? "text-airbnb-dark" : ""
          }`}
        />
        <span className='text-xs font-semibold'>Ghosts</span>
      </div>

      <div
        onClick={() => {
          setWing("Werewolves"), console.log("Werewolves");
        }}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2  ${
          dataWing == "Werewolves" ? "border-gray-800" : "border-white"
        } hover:border-airbnb-dark hover:text-airbnb-dark opacity-80 hover:opacity-100`}
      >
        <GiWerewolf
          className={`w-8 h-8 ${
            dataWing == "Werewolves" ? "text-airbnb-dark" : ""
          }`}
        />
        <span className='text-xs font-semibold'>Werewolves</span>
      </div>

      <div
        onClick={() => {
          setWing("Zombies"), console.log("Zombies");
        }}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2  ${
          dataWing == "Zombies" ? "border-gray-800" : "border-white"
        } hover:border-airbnb-dark hover:text-airbnb-dark opacity-80 hover:opacity-100`}
      >
        <GiShamblingZombie
          className={`w-8 h-8 ${
            dataWing == "Zombies" ? "text-airbnb-dark" : ""
          }`}
        />
        <span className='text-xs font-semibold'>Zombies</span>
      </div>
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
