import { HiMenu, HiOutlineUser } from "react-icons/hi";

const UserNav = () => {
  return (
    <div className='p-2 relative inline-block border rounded-full'>
      <button className='flex items-center'>
        <HiMenu />
        <HiOutlineUser />
      </button>
    </div>
  );
};

export default UserNav;
