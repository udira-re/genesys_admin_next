"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/store/authStore";

export default function DashboardHome() {
  const router = useRouter();
  const t = useTranslations();
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (!token) {
      router.replace("/login"); // No token → redirect to login
    }
  }, [token, router]);

  if (!token) {
    return null; // Prevent showing dashboard content before redirect
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Card container */}
      <div
        onClick={() => router.push("/users")}
        className="cursor-pointer flex items-center bg-white shadow-md hover:shadow-lg transition-shadow rounded-2xl p-6 border border-gray-300"
      >
        {/* Icon */}
        <div className="w-16 h-16 flex-shrink-0 rounded-full bg-gradient-to-b from-purple-300 to-blue-300 flex items-center justify-center mr-4 border border-red-500">
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
          </svg>
        </div>

        {/* Text Content */}
        <div>
          <h3 className="text-xl font-semibold text-black">
            {t("dashboard.user")}
          </h3>
          <p className="text-gray-500">{t("dashboard.userList")}</p>
        </div>
      </div>
    </div>
  );
}
