export type Room = {
  id: string;
  price_per_night: number;
};

interface ReservationSidebarProps {
  room: Room;
}

const ReservationSidebar: React.FC<ReservationSidebarProps> = ({ room }) => {
  return (
    <aside className='mt-6 p-6 col-span-2 rounded-xl border border-gray-300 shadow-xl'>
      <h2 className='mb-5 text-2xl'>${room.price_per_night} per night</h2>

      <div className='mb-6 p-3 border border-gray-400 rounded-xl'>
        <label className='mb-2 block font-bold text-xs'>Guests</label>

        <select className='w-full -ml-1 text-xs'>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </select>
      </div>

      <div className='cursor-pointer w-full mb-6 py-6 text-center text-white bg-airbnb hover:bg-airbnb-dark rounded-xl'>
        Book
      </div>

      <div className='mb-4 flex justify-between items-center'>
        <p>${room.price_per_night} * 4 nights</p>

        <p>$800</p>
      </div>

      <div className='mb-4 flex justify-between items-center'>
        <p>Haunted Hotel Fee</p>

        <p>$40</p>
      </div>

      <hr />

      <div className='mt-4 flex justify-between items-center font-bold'>
        <p>Total</p>

        <p>$840</p>
      </div>
    </aside>
  );
};

export default ReservationSidebar;
