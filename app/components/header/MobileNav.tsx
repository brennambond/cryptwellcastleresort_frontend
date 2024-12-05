import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import NavLinks from "./NavLinks";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { Separator } from "@/components/ui/separator";

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
        <SheetContent className='flex flex-col gap-6 bg-blue-main lg:hidden z-[99]'>
          <Image
            src='/hotel-logo-main.png'
            alt='Haunted Hotel logo'
            width={500}
            height={500}
            className='self-center w-20 h-20'
          />
          <Separator className='border border-purple-950 max-w-[70%] self-center' />
          <NavLinks />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
