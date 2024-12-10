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
}

const CheckoutModal: React.FC<CheckoutProps> = ({ className }) => {
  const router = useRouter();
  return (
    <Dialog>
      <DialogTrigger className={className}>Book</DialogTrigger>
      <DialogContent className='flex justify-between items-center flex-col h-[50vh] font-cormorant bg-white-main p-0'>
        <DialogHeader className='h-[100px] flex items-center rounded-t-lg justify-center w-full border-b bg-gray-800'>
          <DialogTitle className='text-white-main h3-medium capitalize tracking-wider font-germania'>
            Thanks for booking!
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </DialogDescription>
        <DialogDescription>
          Click here to navigate to your reservations:{" "}
          <span>
            <Link href='/myreservations'>Reservations</Link>
          </span>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;

// MenuLink: React.FC<MenuLinkProps> = ({ label, onClick }) =>
