"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import useSignupModal from "@/app/hooks/useSignupModal";
import { login } from "@/app/lib/actions";
import CustomButton from "../CustomButton";
import Modal from "../Modal";

const SignupModal = () => {
  const router = useRouter();
  const signupModal = useSignupModal();

  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const submitSignup = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form reload
    setLoading(true);
    setErrors([]);

    try {
      const formData = {
        email: email,
        password1: password1,
        password2: password2,
      };

      // Call backend to register user
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/auth/register/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // If registration fails, collect errors
        const tmpErrors: string[] = Object.values(data)
          .map((item) => (Array.isArray(item) ? item : [item])) // Ensure each item is an array
          .flat()
          .filter((item): item is string => typeof item === "string");
        setErrors(tmpErrors);
        return;
      }

      // Handle successful registration
      if (data.access) {
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);

        signupModal.close(); // Close modal
        router.push("/"); // Redirect to home
        router.refresh();
      }
    } catch (error: any) {
      console.error("Signup failed:", error);
      setErrors(["An unexpected error occurred. Please try again."]);
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <form onSubmit={submitSignup} className='space-y-4'>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder='Your email address'
        type='email'
        className='w-full h-[54px] border border-gray-300 px-4 rounded-xl'
        required
      />

      <input
        onChange={(e) => setPassword1(e.target.value)}
        value={password1}
        placeholder='Your password'
        type='password'
        className='w-full h-[54px] border border-gray-300 px-4 rounded-xl'
        required
      />

      <input
        onChange={(e) => setPassword2(e.target.value)}
        value={password2}
        placeholder='Repeat password'
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
        label={loading ? "Signing up..." : "Submit"}
        disabled={loading}
        onClick={() => {}} // Prevents extra calls
      />
    </form>
  );

  return (
    <Modal
      isOpen={signupModal.isOpen}
      close={signupModal.close}
      label='Sign up'
      content={content}
    />
  );
};

export default SignupModal;
