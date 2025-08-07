"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/services/auth";
import { useAuthStore } from "@/store/authStore";
import { TLoginSchema } from "@/types/authTypes";

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginSchema>();

  const mutation = useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      console.log("Login response:", data);
      const accessToken = data?.accessToken;

      if (!accessToken) {
        alert("Access token missing in login response");
        return;
      }

      // Assuming your setAuth can store both tokens (adjust if needed)
      setAuth(accessToken);

      router.push("/dashboard");
    },
    onError: (error) => {
      // Handle error if needed
    },
  });

  const onSubmit = (data: TLoginSchema) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-md mx-auto w-full mt-20 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          className="w-full border rounded px-3 py-2"
        />
        <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
          className="w-full border rounded px-3 py-2"
        />
        <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>

        <button
          type="submit"
          className={`w-full bg-blue-600 text-white py-2 rounded font-semibold 
          }`}
        >
          Login{" "}
        </button>
      </form>
    </div>
  );
}
