import MotionDiv from "@/components/motion/MotionDiv";
import { fadeIn } from "@/utils/motion";
import Image from "next/image";
import { TypingText } from "./CustomTexts";

const HotelIntro = () => {
  return (
    <MotionDiv
      variants={fadeIn("up", "tween", 0.3, 0.7)}
      initial='hidden'
      whileInView='show'
      viewport={{ once: true }}
      className='flex-center relative max-h-[20%]'
    >
      <Image
        src='/hotel-main-1.png'
        alt='Hotel Main'
        width={1500}
        height={1500}
        className='object-cover object-bottom w-full z-10 relative'
      />
      <TypingText title={"The vacation of your nightmares starts here..."} />
    </MotionDiv>
  );
};

export default HotelIntro;
