"use client";

import { useState } from "react";
import Image from "next/image";
import useSearchModal, { SearchQuery } from "../hooks/useSearchModal";
import WingsList from "./WingsList";

const Wings = () => {
  const searchModal = useSearchModal();
  const [wing, setWing] = useState("");

  const _setWing = (_wing: string) => {
    setWing(_wing);

    const query: SearchQuery = {
      wing: _wing,
      category: searchModal.query.category,
      checkIn: searchModal.query.checkIn,
      checkOut: searchModal.query.checkOut,
      beds: searchModal.query.beds,
      bathrooms: searchModal.query.bathrooms,
      bedrooms: searchModal.query.bedrooms,
      guests: searchModal.query.guests,
    };
    searchModal.setQuery(query);
    console.log(query);
  };

  return (
    <div className='pt-3 cursor-pointer pb-6 flex items-center space-x-12'>
      <div
        onClick={() => _setWing("")}
        className='pb-4 flex flex-col items-cetner space-y-2 border-b-2 border-blue-main opacity-60 hover:border-cyan-700 hover:opacity-100'
      >
        <span className='text-xs'>All</span>
      </div>

      <div
        onClick={() => _setWing("390e3ed3-b849-46af-808a-173e135e7bba")}
        className='pb-4 flex flex-col items-cetner space-y-2 border-b-2 border-blue-main opacity-60 hover:border-cyan-700 hover:opacity-100'
      >
        <Image src='/sanguine.png' alt='Sanguine Wing' width={50} height={50} />
        <span className='text-xs'>Sanguine</span>
      </div>

      <div
        onClick={() => _setWing("0593dc00-ab62-460d-8c16-0c32ea878699")}
        className='pb-4 flex flex-col items-cetner space-y-2 border-b-2 border-blue-main opacity-60 hover:border-cyan-700 hover:opacity-100'
      >
        <Image src='/reborn.png' alt='Reborn Wing' width={50} height={50} />
        <span className='text-xs'>Reborn</span>
      </div>

      <div
        onClick={() => _setWing("1c524452-7139-439e-9727-e9b4f9bd92e0")}
        className='pb-4 flex flex-col items-cetner space-y-2 border-b-2 border-blue-main opacity-60 hover:border-cyan-700 hover:opacity-100'
      >
        <Image src='/arcane.png' alt='Arcane Wing' width={50} height={50} />
        <span className='text-xs'>Arcane</span>
      </div>

      <div
        onClick={() => _setWing("85cdc565-7672-49e4-8098-6ab9de6ea645")}
        className='pb-4 flex flex-col items-cetner space-y-2 border-b-2 border-blue-main opacity-60 hover:border-cyan-700 hover:opacity-100'
      >
        <Image src='/haunted.png' alt='Haunted Wing' width={50} height={50} />
        <span className='text-xs'>Haunted</span>
      </div>
    </div>
  );
};

export default Wings;
