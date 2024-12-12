import MotionDiv from "@/components/motion/MotionDiv";
import { ChamberType } from "./ChambersList";
import { fadeIn } from "@/utils/motion";
import Image from "next/image";
import Link from "next/link";
import { HiMiniArrowRightCircle } from "react-icons/hi2";
import LoginModal from "./header/LoginModal";
import MenuLink from "./header/MenuLink";
import { useRouter } from "next/navigation";
import useLoginModal from "../hooks/useLoginModal";
import { useState } from "react";

interface ChamberProps {
  chamber: ChamberType;
  index: number;
  userId: string | null;
}

const ChambersListItem: React.FC<ChamberProps> = ({
  chamber,
  index,
  userId,
}) => {
  var chamberTitle = chamber.title.split(" ")[0].toString();
  const router = useRouter();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);

  const colorStyle = [
    chamberTitle === "Bloodborn"
      ? "text-red-700 hover:text-red-900"
      : chamberTitle === "Haunted"
      ? "text-cyan-700 hover:text-cyan-900"
      : chamberTitle === "Reborn"
      ? "text-emerald-700 hover:text-emerald-900"
      : "text-purple-700 hover:text-purple-900",
  ];
  const chamber_imageurl =
    "https://hauntedhotel-backend-bucket" + chamber.image_url.slice(17);

  return (
    <MotionDiv
      variants={fadeIn("right", "tween", (index + 1) * 0.5, 0.75)}
      initial='hidden'
      whileInView='show'
      viewport={{ once: true }}
      className='bg-white-main rounded-xl flex flex-col gap-2'
    >
      <Image
        src={chamber_imageurl}
        className='object-cover object-center overflow-hidden aspect-square rounded-t-xl max-h-[250px]'
        alt='Hotel Picture'
        height={1000}
        width={1000}
      />

      <div className='flex flex-col items-start justify-center px-6 py-4 gap-2 p-regular-18'>
        {userId === null ? (
          <>
            <MenuLink
              label={"You Must Log in To Visit This Chamber"}
              className='font-germania cursor-pointer self-center text-red-900 p-regular-20 underline hover:text-red-800 text-center'
              onClick={() => {
                setIsOpen(false);
                loginModal.open();
                router.refresh();
              }}
            />
            <div className={`flex-center  gap-1 ${colorStyle}`}>
              <HiMiniArrowRightCircle className='w-6 h-6' />
              <h3 className=' font-germania'>{chamber.title}</h3>
            </div>
          </>
        ) : (
          <Link
            href={`/chambers/${chamber.id}`}
            className={`cursor-pointer text-lg flex-center gap-1 ${colorStyle}`}
          >
            <HiMiniArrowRightCircle className='w-6 h-6' />
            <h3 className=' font-germania'>{chamber.title}</h3>
          </Link>
        )}

        <div className='flex justify-between items-center  w-full text-gray-500'>
          <p>
            <strong>${chamber.price_per_night}</strong> per night
          </p>
          <p className='p-semibold-16'>Capacity for {chamber.guests} Guests</p>
        </div>
      </div>
    </MotionDiv>
  );
};

export default ChambersListItem;
