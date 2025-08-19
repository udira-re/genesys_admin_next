"use client";

import { useAuthStore } from "@/store/authStore";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const t = useTranslations("navbar");

  const [selectedLang, setSelectedLang] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("locale") || "en"
      : "en",
  );

  const changeLanguage = (lang: string) => {
    setSelectedLang(lang);
    localStorage.setItem("locale", lang);
    window.location.reload(); // or better: context update if implemented
  };

  return (
    <div
      className="flex w-full justify-between px-6 py-3 text-white"
      style={{
        background: "linear-gradient(117deg, #00BFFF 0%, #FF6EFF 66.7%)",
      }}
    >
      <div className="container mx-auto flex items-center justify-between">
        <span
          className="text-lg font-bold cursor-pointer"
          onClick={() => router.push("/dashboard")}
        >
          {t("title")}
        </span>{" "}
        <div className="flex items-center gap-4">
          <select
            value={selectedLang}
            onChange={(e) => changeLanguage(e.target.value)}
            className="rounded px-3 py-1 text-black"
          >
            <option value="en">English</option>
            <option value="it">Italiano</option>
          </select>

          <button
            onClick={async () => {
              await useAuthStore.getState().logout();
              router.replace("/login"); // smoother redirect
            }}
            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-100 transition"
          >
            {t("logout")}
          </button>
        </div>
      </div>
    </div>
  );
}
