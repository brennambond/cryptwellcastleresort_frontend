import ReservationSidebar from "@/app/components/ReservationSidebar";
import Image from "next/image";

const RoomDetailPage = () => {
  return (
    <main className='max-w-[1500px] mx-auto px-6 pb-6'>
      <div className='w-full h-[64vh] overflow-hidden rounded-xl relative mb-4'>
        <Image
          fill
          src='/hotel1.png'
          alt='Hotel Image'
          className='object-cover w-full h-full'
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
        <div className='col-span-3 py-6 pr-6'>
          <h1 className='mb-4 text-4xl'>Room Name</h1>
          <span className='mb-6 block text-lg text-gray-600'>
            4 guests - 2 bedrooms - 1 bathroom
          </span>

          <hr />

          <div className='py-6 flex items-center space-x-4'>
            <Image
              src='/profile-pic.jpg'
              width={50}
              height={50}
              className='rounded-full'
              alt='User Icon'
            />
            <p>
              <strong>John Doe</strong> is your host
            </p>
          </div>

          <hr />

          <p className='mt-6 text-lg'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores
            veritatis omnis iste quidem officia enim sequi ut repellendus ullam
            aliquam odit, perferendis quos perspiciatis, pariatur beatae, sed
            sint eos natus!
          </p>
        </div>

        <ReservationSidebar />
      </div>
    </main>
  );
};

export default RoomDetailPage;
