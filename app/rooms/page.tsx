import Categories from "../components/Categories";
import RoomList from "../components/RoomList";
import Wings from "../components/Wings";

export default function RoomsHomePage() {
  return (
    <main className='max-w-[1500px] mx-auto px-6 my-20'>
      <Wings />
      <div className='mt-4 grid grid-cols-1 md:grid-cols-3 gap-20 px-12 bg-white-main rounded-md py-8'>
        <RoomList />
      </div>
    </main>
  );
}
