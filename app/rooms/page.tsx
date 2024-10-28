import Categories from "../components/Categories";
import RoomList from "../components/RoomList";

export default function RoomsHomePage() {
  return (
    <main className='max-w-[1500px] mx-auto px-6'>
      <Categories />
      <div className='mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6'>
        <RoomList />
      </div>
    </main>
  );
}
