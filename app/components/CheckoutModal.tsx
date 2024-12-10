import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface CheckoutProps {
  className: string;
  onClick: () => void;
}

const CheckoutModal: React.FC<CheckoutProps> = ({ className, onClick }) => {
  const router = useRouter();
  return (
    <Dialog>
      <DialogTrigger onClick={onClick} className={className}>
        Book
      </DialogTrigger>
      <DialogContent className='flex items-start justify-start flex-col lg:h-[50vh] font-cormorant bg-white-main p-0 w-[80%] rounded-xl'>
        <DialogHeader className='h-[100px] flex-center rounded-t-xl sm:rounded-t-lg w-full bg-gray-800'>
          <DialogTitle className='text-white-main h3-medium capitalize tracking-wider font-germania'>
            Thanks for booking!
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className='px-10 p-semibold-18 py-4 text-gray-900'>
          Our Haunted Hosts appreciate your choice to spend what little mortal
          life you have left with us. Should you wish to see the details of your
          reservation, please click the link below. We look forward to hosting
          you.
        </DialogDescription>
        <DialogDescription className='px-10 p-bold-20 text-gray-900'>
          To navigate to your reservations, please click here:
        </DialogDescription>
        <DialogDescription className='self-center underline px-10 p-bold-24 pb-6 text-gray-700 hover:text-gray-950 tracking-wide'>
          <Link href='/myreservations' className=''>
            My Reservations
          </Link>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
