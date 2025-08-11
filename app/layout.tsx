import React from "react";
import "./index.css";
import { LocaleProvider } from "../src/components/localeProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black font-sans">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
