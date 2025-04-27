"use client";

import { useState } from "react";
import Image from "next/image";
import MotionDiv from "@/components/motion/MotionDiv";
import { fadeIn } from "@/utils/motion";
import ChambersList from "./ChambersList";
import SearchFilters from "../header/SearchFilters";
import ChamberServices from "../services/ChamberServices";
import SearchModal from "../header/SearchModal";

const ChambersPageContent: React.FC = () => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<any>({});

  return (
    <main className="wrapper-main bg-[url('../public/background-blue.png')] gap-20">
      <MotionDiv
        variants={fadeIn("up", "tween", 0.3, 0.7)}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        className='flex-center flex-col gap-10 sm:w-[90%] max-w-[90%] md:w-[80%] md:max-w-[80%]'
      >
        <h1 className='h1-bold flex-center font-germania tracking-wider border-b-4 border-white-main pt-20'>
          Guest Chambers
        </h1>
        <Image
          src='/witches-room-1.png'
          width={1000}
          height={1000}
          alt='image'
          className='object-cover object-center rounded-xl shadow-2xl overflow-hidden h-[50vh] md:h-[70vh] xl:h-[80vh]'
        />
        <p className='p-medium-18 md:p-medium-20 xl:max-w-[90%]'>
          Each Wing of our resort comprises 30 guest chambers: 16{" "}
          <strong className='italic'>Single Bedrooms with 2 Beds</strong>, 10{" "}
          <strong className='italic'>Single Bedrooms with 3 Beds</strong>, and 4{" "}
          <strong className='italic'>Double Bedroom Deluxe Suites</strong>.
        </p>
        <SearchFilters setIsSearchModalOpen={setIsSearchModalOpen} />
      </MotionDiv>

      <SearchModal
        isOpen={isSearchModalOpen}
        onRequestClose={() => setIsSearchModalOpen(false)}
        setFilteredRooms={setSearchQuery}
      />

      <ChambersList searchQuery={searchQuery} />

      <ChamberServices />
    </main>
  );
};

export default ChambersPageContent;
