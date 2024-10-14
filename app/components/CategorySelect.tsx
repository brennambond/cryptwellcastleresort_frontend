import { GiBat, GiGhost, GiWerewolf, GiShamblingZombie } from "react-icons/gi";

interface CategoriesProps {
  dataCategory: string;
  setCategory: (category: string) => void;
}

const CategorySelect: React.FC<CategoriesProps> = ({
  dataCategory,
  setCategory,
}) => {
  return (
    <>
      <div className='pt-3 cursor-pointer pb-6 flex items-center space-x-12'>
        <div
          onClick={() => setCategory("Vampires")}
          className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
            dataCategory == "Vampires"
              ? "border-airbnb-dark text-airbnb-dark"
              : "border-white"
          }  hover:border-airbnb-dark hover:text-airbnb-dark opacity-80 hover:opacity-100`}
        >
          <GiBat className='w-8 h-8' />
          <span className='text-xs font-semibold'>Vampires</span>
        </div>

        <div
          onClick={() => setCategory("Ghosts")}
          className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
            dataCategory == "Ghosts"
              ? "border-airbnb-dark text-airbnb-dark"
              : "border-white"
          }  hover:border-airbnb-dark hover:text-airbnb-dark opacity-80 hover:opacity-100`}
        >
          <GiGhost className='w-8 h-8' />
          <span className='text-xs font-semibold'>Ghosts</span>
        </div>

        <div
          onClick={() => setCategory("Werewolves")}
          className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
            dataCategory == "Werewolves"
              ? "border-airbnb-dark text-airbnb-dark"
              : "border-white"
          }  hover:border-airbnb-dark hover:text-airbnb-dark opacity-80 hover:opacity-100`}
        >
          <GiWerewolf className='w-8 h-8' />
          <span className='text-xs font-semibold'>Werewolves</span>
        </div>

        <div
          onClick={() => setCategory("Zombies")}
          className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
            dataCategory == "Zombies"
              ? "border-airbnb-dark text-airbnb-dark"
              : "border-white"
          }  hover:border-airbnb-dark hover:text-airbnb-dark opacity-80 hover:opacity-100`}
        >
          <GiShamblingZombie className='w-8 h-8' />
          <span className='text-xs font-semibold'>Zombies</span>
        </div>
      </div>
    </>
  );
};

export default CategorySelect;

// For whenever this component is called in another component:
// The state for dataCategory would look like: const [dataCategory, setDataCategory] = useState('')
// The setCategory function would look like this: const setCategory = (category: string) => { setDataCategory(category) }
