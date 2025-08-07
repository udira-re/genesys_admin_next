import Navbar from "@/components/navbar";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-6">{children}</main>
    </div>
  );
}
