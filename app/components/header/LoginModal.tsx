"use client";

import Modal from "../Modal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useLoginModal from "../../hooks/useLoginModal";
import CustomButton from "../CustomButton";
import { login } from "@/app/lib/actions";

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const submitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);

    try {
      const response = await login(email, password);

      if (response.user_id) {
        localStorage.setItem("user_id", response.user_id);
        if (response.access)
          localStorage.setItem("accessToken", response.access);
        if (response.refresh)
          localStorage.setItem("refreshToken", response.refresh);

        loginModal.close();
        router.refresh();
      } else {
        setErrors(["Invalid email or password. Please try again."]);
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      setErrors([error.message || "An unexpected error occurred."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={loginModal.isOpen}
      close={loginModal.close}
      label='Log in'
      content={
        <form onSubmit={submitLogin} className='space-y-4 font-cormorant'>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder='Your email address'
            type='email'
            className='w-full h-[54px] border border-gray-300 px-4 rounded-xl'
            required
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder='Your password'
            type='password'
            className='w-full h-[54px] border border-gray-300 px-4 rounded-xl'
            required
          />
          {errors.length > 0 && (
            <div className='p-4 bg-red-500 text-white rounded-xl'>
              {errors.map((error, index) => (
                <div key={`error_${index}`}>{error}</div>
              ))}
            </div>
          )}
          <CustomButton
            label={loading ? "Logging in..." : "Submit"}
            disabled={loading}
            onClick={submitLogin}
          />
        </form>
      }
    />
  );
};

export default LoginModal;
