import WingsList from "../components/WingsList";

export default function WingsHomePage() {
  return (
    <main className="max-w-[1500px] mx-auto px-6 bg-[url('../public/background-blue.png')]">
      <div className='mt-4 grid grid-cols-1 md:grid-cols-3 gap-20 px-12  rounded-md mini-wrapper'>
        Wings
      </div>
      <WingsList />
    </main>
  );
}
