"use client";
import { userLogin } from "@/apis/user";
import Button from "@/components/Button";
import { useUser } from "@/contexts/userContext";
import { ILogin } from "@/types/auth";
import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/constants/validations";

const LoginForm = () => {
  const { login } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (formData: ILogin) => {
    const result = await userLogin(formData.email, formData.password);
    if (result.success) {
      login(result.data);
      window.location.href = "/profile";
    } else {
      console.error("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Login</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <label className="block" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            {/* Display email validation error */}
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="block" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            {/* Display password validation error */}
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="flex items-center justify-between mt-6">
            <Button text="Login" />
            <Link href="/register">
              <button className="text-blue-600 hover:underline mt-6">
                Register
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
