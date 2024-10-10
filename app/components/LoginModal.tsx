"use client";

import { useRouter } from "next/navigation";

import CustomButton from "./CustomButton";
import Modal from "./Modal";

import useLoginModal from "../hooks/useLoginModal";
import apiService from "../services/apiService";
import { handleLogin } from "../lib/actions";
import { useState } from "react";

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const submitLogin = async () => {
    const formData = {
      email: email,
      password: password,
    };

    const response = await apiService.post(
      "/api/auth/login/",
      JSON.stringify(formData)
    );

    if (response.access) {
      handleLogin(response.user.pk, response.access, response.refresh);

      loginModal.close();

      router.push("/");
    } else {
      setErrors(response.non_field_errors);
    }
  };

  const content = (
    <>
      <form action={submitLogin} className='space-y-4'>
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Your email address'
          type='email'
          className='w-full h-[54px] border border-gray-300 px-4 rounded-xl'
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Your password'
          type='password'
          className='w-full h-[54px] border border-gray-300 px-4 rounded-xl'
        />

        {errors.map((error, index) => {
          return (
            <div
              key={`error_${index}`}
              className='p-5 bg-airbnb text-white rounded-xl opacity-80'
            >
              {error}
            </div>
          );
        })}

        <CustomButton label='Submit' onClick={submitLogin} />
      </form>
    </>
  );
  return (
    <Modal
      isOpen={loginModal.isOpen}
      close={loginModal.close}
      label='Log in'
      content={content}
    ></Modal>
  );
};

export default LoginModal;
