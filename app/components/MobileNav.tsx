import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import NavLinks from "./NavLinks";
import { HiBars3BottomLeft } from "react-icons/hi2";

const MobileNav = () => {
  return (
    <nav className='lg:hidden z-[99]'>
      <Sheet>
        <SheetTrigger className='align-middle'>
          <HiBars3BottomLeft
            width={50}
            height={50}
            className='cursor-pointer w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-purple-950'
          />
        </SheetTrigger>
        <SheetContent className='flex flex-col gap-6 bg-purple-950 lg:hidden z-[99]'>
          <NavLinks />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
