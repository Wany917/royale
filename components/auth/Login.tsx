"use client";

import React from "react";
import { useState } from "react";
import { Button, Input, Link, Checkbox } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, LoginFormData } from "@/app/auth/login/schema";
import { login } from "@/app/auth/actions";

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleFormSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4 p-4">
      <div className="w-full text-left">
        <p className="pb-2 text-xl font-medium">Welcome Back</p>
        <p className="text-small text-default-500">
          Log in to your account to continue
        </p>
      </div>

      <form
        className="flex w-full flex-col gap-3"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Input
          label="Email Address"
          {...register("email")}
          errorMessage={errors.email?.message}
          placeholder="Enter your email"
          type="email"
          variant="underlined"
        />
        <Input
          endContent={
            <button type="button" onClick={toggleVisibility}>
              <Icon
                className="pointer-events-none text-2xl text-default-400"
                icon={isVisible ? "solar:eye-closed-linear" : "solar:eye-bold"}
              />
            </button>
          }
          label="Password"
          {...register("password")}
          errorMessage={errors.password?.message}
          placeholder="Enter your password"
          type={isVisible ? "text" : "password"}
          variant="underlined"
        />
        <div className="flex items-center justify-between px-1 py-2">
          <Checkbox name="remember" size="sm">
            Remember for 15 days
          </Checkbox>
          <Link className="text-default-500" href="#" size="sm">
            Forgot password?
          </Link>
        </div>
        <Button color="primary" type="submit">
          Log In
        </Button>
      </form>

      <p className="text-center text-small">
        Need to create an account?&nbsp;
        <Link href="#" size="sm">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
