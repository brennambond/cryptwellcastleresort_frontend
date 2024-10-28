import WingsList from "@/app/components/WingsList";

const WingsPage = () => {
  return (
    <main className='max-w-[1500px] mx-auto px-6 '>
      <div className='mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 '>
        <WingsList />
        <p>Wings</p>
      </div>
    </main>
  );
};

export default WingsPage;
