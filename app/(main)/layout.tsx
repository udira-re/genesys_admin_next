import AuthGuard from "@/components/authGuard";
import Navbar from "@/components/navbar";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <AuthGuard>
        <Navbar />
        <main className="container mx-auto p-6">{children}</main>
      </AuthGuard>
    </div>
  );
}
