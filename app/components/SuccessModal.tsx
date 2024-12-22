"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white p-6 rounded'>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        <button
          onClick={onClose}
          className='mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'
        >
          Close
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
