import { GiBat, GiGhost, GiWerewolf, GiShamblingZombie } from "react-icons/gi";

const Categories = () => {
  return (
    <div className='pt-3 cursor-pointer pb-6 flex items-center space-x-12'>
      <div className='pb-4 flex flex-col items-center space-y-2 border-b-2 border-white hover:border-airbnb-dark hover:text-airbnb-dark opacity-80 hover:opacity-100'>
        <GiBat className='w-8 h-8' />
        <span className='text-xs font-semibold'>Vampires</span>
      </div>
      <div className='pb-4 flex flex-col items-center space-y-2 border-b-2 border-white hover:border-airbnb-dark hover:text-airbnb-dark opacity-80 hover:opacity-100'>
        <GiGhost className='w-8 h-8' />
        <span className='text-xs font-semibold'>Ghosts</span>
      </div>
      <div className='pb-4 flex flex-col items-center space-y-2 border-b-2 border-white hover:border-airbnb-dark hover:text-airbnb-dark opacity-80 hover:opacity-100'>
        <GiWerewolf className='w-8 h-8' />
        <span className='text-xs font-semibold'>Werewolves</span>
      </div>
      <div className='pb-4 flex flex-col items-center space-y-2 border-b-2 border-white hover:border-airbnb-dark hover:text-airbnb-dark opacity-80 hover:opacity-100'>
        <GiShamblingZombie className='w-8 h-8' />
        <span className='text-xs font-semibold'>Zombies</span>
      </div>
    </div>
  );
};

export default Categories;
