import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import Image from "next/image";
import NavLinks from "./NavLinks";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { Separator } from "@/components/ui/separator";

const MobileNav = () => {
  const [open, setOpen] = useState(false);

  const closeMobileNav = () => setOpen(false);

  return (
    <nav className='lg:hidden z-[99]'>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className='align-middle'>
          <HiBars3BottomLeft
            width={50}
            height={50}
            className='cursor-pointer w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white-main'
          />
        </SheetTrigger>
        <SheetContent className='flex flex-col gap-6 bg-gray-800 lg:hidden z-[99]'>
          <SheetClose /> {/* Styled Close Button */}
          <Image
            src='/hotel-logo-main.png'
            alt='Haunted Hotel logo'
            width={500}
            height={500}
            className='self-center w-20 h-20 bg-white-main rounded-full'
          />
          <Separator className='border border-white-main max-w-[70%] self-center' />
          <NavLinks closeOnClick={closeMobileNav} />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
