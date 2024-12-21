"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import { login } from "@/app/lib/actions";
import React, { useState } from "react";
import Modal from "../Modal";

const LoginModal: React.FC = () => {
  const loginModal = useLoginModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setErrors([]);
    setLoading(true);
    try {
      await login(email, password);
      loginModal.close();
      window.location.reload();
    } catch (error: any) {
      setErrors(
        Array.isArray(error.message)
          ? error.message
          : [error.message || "An unexpected error occurred."]
      );
    } finally {
      setLoading(false);
    }
  };

  if (!loginModal.isOpen) return null;

  return (
    <Modal
      isOpen={loginModal.isOpen}
      onRequestClose={loginModal.close}
      label='Log In'
      content={
        <div className='flex flex-col items-center justify-center'>
          <h2 className='text-lg font-bold mb-4'>Log In</h2>
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            className='border rounded-md p-2 mb-2 w-full'
          />
          <button
            onClick={handleLogin}
            disabled={loading}
            className='bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600'
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </div>
      }
    />
  );
};

export default LoginModal;
