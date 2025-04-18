"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/header/Header";
import { useState } from "react";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <main className="">
          {children}
        </main>
      </body>
    </html>
  );
}
