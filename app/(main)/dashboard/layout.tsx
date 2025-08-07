"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useAuthHydrated } from "@/hooks/useHasHydrated";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const hydrated = useAuthHydrated();

  useEffect(() => {
    if (hydrated && !token) {
      router.push("/auth/login");
    }
  }, [hydrated, token, router]);

  if (!hydrated) return <p className="text-center mt-20">Loading...</p>;

  if (!token)
    return <p className="text-center mt-20">Checking authentication...</p>;

  return <>{children}</>;
}
