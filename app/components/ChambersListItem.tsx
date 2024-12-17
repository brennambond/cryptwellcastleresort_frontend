import MotionDiv from "@/components/motion/MotionDiv";
import { ChamberType } from "./ChambersList";
import { fadeIn } from "@/utils/motion";
import Image from "next/image";
import Link from "next/link";
import { HiMiniArrowRightCircle } from "react-icons/hi2";

interface ChamberProps {
  chamber: ChamberType;
  index: number;
}

const getChamberColor = (title: string): string => {
  if (title.startsWith("Bloodborn")) return "text-red-700 hover:text-red-900";
  if (title.startsWith("Haunted")) return "text-cyan-700 hover:text-cyan-900";
  if (title.startsWith("Reborn"))
    return "text-emerald-700 hover:text-emerald-900";
  return "text-purple-700 hover:text-purple-900";
};

const buildImageUrl = (image_url: string) => {
  return `https://hauntedhotel-backend-bucket${image_url.slice(17)}`;
};

const ChambersListItem: React.FC<ChamberProps> = ({ chamber, index }) => {
  const colorStyle = getChamberColor(chamber.title);
  const chamberImageUrl = buildImageUrl(chamber.image_url);

  return (
    <MotionDiv
      variants={fadeIn("right", "tween", (index + 1) * 0.5, 0.75)}
      initial='hidden'
      whileInView='show'
      viewport={{ once: true }}
      className='bg-white-main rounded-xl flex flex-col gap-2'
    >
      <Image
        src={chamberImageUrl}
        className='object-cover object-center overflow-hidden aspect-square rounded-t-xl max-h-[250px]'
        alt={chamber.title}
        height={1000}
        width={1000}
      />

      <div className='flex flex-col items-start justify-center px-6 py-4 gap-2 p-regular-18'>
        <Link
          href={`/chambers/${chamber.id}`}
          className={`cursor-pointer text-lg flex-center gap-1 ${colorStyle}`}
        >
          <HiMiniArrowRightCircle className='w-6 h-6' />
          <h3 className='font-germania'>{chamber.title}</h3>
        </Link>

        <div className='flex justify-between items-center w-full text-gray-500'>
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
