// components/AuthGuard.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const { token, logout } = useAuthStore((state) => state);

  useEffect(() => {
    if (!token) {
      logout();
      router.push("/login"); // redirect to login
    }
  }, [token, logout, router]);

  // Optionally, you can show a loading state while checking
  if (!token) return <p className="text-gray-500">Redirecting...</p>;

  return <>{children}</>;
}
