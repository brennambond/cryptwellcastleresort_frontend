import Categories from "../components/Categories";
import RoomList from "../components/RoomList";

export default function RoomsHomePage() {
  return (
    <main className='max-w-[1500px] mx-auto px-6 my-20'>
      {/* <Categories /> */}
      <div className='mt-4 grid grid-cols-1 md:grid-cols-3 gap-20 px-12 bg-white-main rounded-md py-8'>
        <RoomList />
      </div>
    </main>
  );
}
