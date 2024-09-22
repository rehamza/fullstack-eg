import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { register } from "@/apis/user";
import Button from "@/components/Button";
import { useUser } from "@/contexts/userContext";
import { IRegistration } from "@/types/auth";
import { registrationSchema } from "@/constants/validations";

const RegistrationForm = () => {
  const { login } = useUser();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegistration>({
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit = async (data: IRegistration) => {
    const res = await register(data.name, data.email, data.password);
    if (res.success) {
      login(res.data);
      window.location.href = "/profile";
    } else {
      console.error("User registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Register</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <label className="block" htmlFor="username">
              Name
            </label>
            <input
              type="text"
              {...formRegister("name")}
              id="name"
              placeholder="Name"
              className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-600"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="block" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              {...formRegister("email")}
              id="email"
              placeholder="Email"
              className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-600"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="block" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              {...formRegister("password")}
              id="password"
              placeholder="Password"
              className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-600"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-baseline justify-between mt-4">
            <Button text="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
