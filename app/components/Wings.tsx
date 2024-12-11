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
  };

  return (
    <div className='pt-3 pb-6 flex items-center justify-center space-x-12'>
      <div
        onClick={() => _setWing("")}
        className='pb-4 flex flex-col items-center space-y-2 border-b-2 border-blue-main opacity-60 hover:border-cyan-700 hover:opacity-100 cursor-pointer'
      >
        <span className='text-xs'>All</span>
      </div>

      <div
        onClick={() => _setWing("390e3ed3-b849-46af-808a-173e135e7bba")}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
          wing == "390e3ed3-b849-46af-808a-173e135e7bba"
            ? "border-cyan-700 opacity-100"
            : "border-blue-main opacity-60"
        }  hover:border-cyan-700 hover:opacity-100 hover:scale-110 transition cursor-pointer`}
      >
        <Image
          src='/sanguine.png'
          alt='Sanguine Wing'
          width={1000}
          height={1000}
          className='w-40 rounded-md'
        />
        <span className='text-xs'>Sanguine</span>
      </div>

      <div
        onClick={() => _setWing("0593dc00-ab62-460d-8c16-0c32ea878699")}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
          wing == "0593dc00-ab62-460d-8c16-0c32ea878699"
            ? "border-cyan-700 opacity-100"
            : "border-blue-main opacity-60"
        }  hover:border-cyan-700 hover:opacity-100 hover:scale-110 transition cursor-pointer`}
      >
        <Image
          src='/reborn.png'
          alt='Reborn Wing'
          width={1000}
          height={1000}
          className='w-40 rounded-md'
        />
        <span className='text-xs'>Reborn</span>
      </div>

      <div
        onClick={() => _setWing("1c524452-7139-439e-9727-e9b4f9bd92e0")}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
          wing == "1c524452-7139-439e-9727-e9b4f9bd92e0"
            ? "border-cyan-700 opacity-100"
            : "border-blue-main opacity-60"
        }  hover:border-cyan-700 hover:opacity-100 hover:scale-110 transition cursor-pointer`}
      >
        <Image
          src='/arcane.png'
          alt='Arcane Wing'
          width={1000}
          height={1000}
          className='w-40 rounded-md'
        />
        <span className='text-xs'>Arcane</span>
      </div>

      <div
        onClick={() => _setWing("85cdc565-7672-49e4-8098-6ab9de6ea645")}
        className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
          wing == "85cdc565-7672-49e4-8098-6ab9de6ea645"
            ? "border-cyan-700 opacity-100"
            : "border-blue-main opacity-60"
        }  hover:border-cyan-700 hover:opacity-100 hover:scale-110 transition cursor-pointer`}
      >
        <Image
          src='/haunted.png'
          alt='Haunted Wing'
          width={1000}
          height={1000}
          className='w-40 rounded-md'
        />
        <span className='text-xs'>Haunted</span>
      </div>
    </div>
  );
};

export default Wings;
