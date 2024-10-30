import RoomList from "./components/RoomList";

import Categories from "./components/Categories";
import Wings from "./components/Wings";

export default function Home() {
  return (
    <main className='max-w-[1500px] mx-auto px-6'>
      {/* <Categories /> */}
      <div className='mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6'>
        Front Page
      </div>
      <Wings />
    </main>
  );
}
