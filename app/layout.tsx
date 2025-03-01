import "./globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import type React from "react";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Speer Tech - AirCall Phone Challenge",
  description: "A Next.js clone of the Aircall Phone app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
