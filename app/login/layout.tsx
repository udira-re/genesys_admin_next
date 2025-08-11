"use client";

import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main
      className="flex min-h-screen items-center justify-center p-6"
      style={{
        background: "linear-gradient(117deg, #00BFFF 0%, #FF6EFF 66.7%)",
      }}
    >
      {children}
    </main>
  );
}
