"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import React from "react";

interface CheckoutProps {
  className: string;
  onClick: () => void;
}

const CheckoutModal: React.FC<CheckoutProps> = ({ className, onClick }) => {
  return (
    <Dialog>
      <DialogTrigger onClick={onClick} className={className}>
        Book Now
      </DialogTrigger>
      <DialogContent className='bg-white p-6 rounded'>
        <DialogTitle>Booking Confirmed</DialogTitle>
        <DialogDescription>
          Thank you for booking with us! Click below to view your reservations.
        </DialogDescription>
        <Link href='/myreservations' className='text-blue-500 underline'>
          My Reservations
        </Link>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
