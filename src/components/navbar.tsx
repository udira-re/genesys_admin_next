"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    useAuthStore.getState().logout(); // clear all tokens
    router.push("/auth/login");
  };

  return (
    <div
      className="flex w-full justify-between px-6 py-3 text-white"
      style={{
        background: "linear-gradient(117deg, #00BFFF 0%, #FF6EFF 66.7%)",
      }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-lg font-bold">THE GENESYS</span>
        <button
          onClick={handleLogout}
          className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
