"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { signUp } from "next-auth-sanity/client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const defaultFormData = {
  email: "",
  name: "",
  password: "",
};

const Auth = () => {
  const { push } = useRouter();
  const [formData, setFormData] = useState(defaultFormData);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      push("/");
    }
  }, [push, session]);

  const loginHandler = async () => {
    try {
      await signIn();
      push("/");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user = await signUp(formData);
      if (user) {
        toast.success("sucess, Please Sign in");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    } finally {
      setFormData(defaultFormData);
    }
  };

  const inputStyles =
    " border border-gray-300 text-[15px] sm:text-xs text-black outline-none w-full px-1 h-[45px] rounded block";
  return (
    <section className=" ">
      <div className="space-y-4 py-10 px-6 w-full md:w-[40%] mx-auto">
        <div className="flex mb-8 flex-col md:flex-row items-center justify-between">
          <h1 className=" text-[15px] font-semibold leading-7 tracking-wider">
            Create an Account
          </h1>
          <p className=" py-3 text-[12px] font-semibold">OR</p>
          <span className="inline-flex items-center">
            <AiFillGithub
              onClick={loginHandler}
              className="mr-3  cursor-pointer text-black dark:text-white"
              size={26}
            />{" "}
            <FcGoogle
              onClick={loginHandler}
              className="ml-3  cursor-pointer"
              size={26}
            />
          </span>
        </div>

        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Mail"
            required
            className={inputStyles}
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className={inputStyles}
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            minLength={6}
            className={inputStyles}
            value={formData.password}
            onChange={handleInputChange}
          />

          <button
            type="submit"
            className="w-full bg-tertiary-dark focus:outline-none font-medium rounded text-sm px-5 py-2.5 text-center"
          >
            Sign Up
          </button>
        </form>

        <p className=" text-sm font-[500] ">
          Already have an account?{" "}
          <span className="underline cursor-pointer" onClick={loginHandler}>
            Login
          </span>
        </p>
      </div>
    </section>
  );
};

export default Auth;
