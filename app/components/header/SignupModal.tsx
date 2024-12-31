"use client";

import useSignupModal from "@/app/hooks/useSignupModal";
import { register, login } from "@/app/lib/actions";
import React, { useState } from "react";
import Modal from "../Modal";
import SuccessModal from "../SuccessModal";

const SignupModal: React.FC = () => {
  const signupModal = useSignupModal();
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleSignup = async () => {
    setErrors([]);
    setLoading(true);
    if (password1 !== password2) {
      setErrors(["Passwords do not match."]);
      setLoading(false);
      return;
    }
    try {
      await register(email, password1, password2);
      setIsSuccessModalOpen(true); // Show success modal
    } catch (error: any) {
      setErrors([error.message || "An unexpected error occurred."]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = async () => {
    try {
      await login(email, password1); // Log in the user
      setIsSuccessModalOpen(false);
      signupModal.close();
      window.location.reload(); // Refresh the page
    } catch (error: any) {
      console.error("Error logging in after signup:", error.message);
      setErrors([error.message || "Failed to log in. Please try again."]);
    }
  };

  if (!signupModal.isOpen) return null;

  return (
    <>
      <Modal
        isOpen={signupModal.isOpen}
        onRequestClose={signupModal.close}
        label='Sign Up'
        content={
          <div className='flex flex-col items-center justify-center gap-4'>
            {errors.length > 0 && (
              <div className='text-red-500 mb-4'>
                {errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              className='border rounded-md p-2 mb-2 w-full'
            />
            <input
              type='password'
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              placeholder='Password'
              className='border rounded-md p-2 mb-2 w-full'
            />
            <input
              type='password'
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              placeholder='Confirm Password'
              className='border rounded-md p-2 mb-2 w-full'
            />
            <button
              onClick={handleSignup}
              disabled={loading}
              className='bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 button-mini'
            >
              {loading ? "Signing up..." : "Confirm Sign Up"}
            </button>
          </div>
        }
      />
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessClose}
        title='Account Created'
        description='Your account has been successfully created!'
      />
    </>
  );
};

export default SignupModal;
