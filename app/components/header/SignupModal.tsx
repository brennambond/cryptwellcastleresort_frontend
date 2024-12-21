"use client";

import useSignupModal from "@/app/hooks/useSignupModal";
import { register } from "@/app/lib/actions";
import React, { useState } from "react";
import Modal from "../Modal";

const SignupModal: React.FC = () => {
  const signupModal = useSignupModal();
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setErrors([]);
    setLoading(true);
    try {
      await register(email, password1, password2);
      signupModal.close();
      window.location.reload();
    } catch (error: any) {
      setErrors([error.message || "An unexpected error occurred."]);
    } finally {
      setLoading(false);
    }
  };

  if (!signupModal.isOpen) return null;

  return (
    <Modal
      isOpen={signupModal.isOpen}
      onRequestClose={signupModal.close}
      label='Sign Up'
      content={
        <div className='flex flex-col items-center justify-center'>
          <h2 className='text-lg font-bold mb-4'>Sign Up</h2>
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
            className='bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600'
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </div>
      }
    />
  );
};

export default SignupModal;
