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
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [displayActions, setDisplayActions] = useState<boolean>(true);

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Header authenticated={authenticated} displayActions={displayActions} />

        {/* Testing Buttons div (comment out when the landing page and authentication is working) */}
        <div className="absolute top-20 right-3 space-x-2">
          Header Testing Buttons:
          <button
            className="ml-2 bg-gray-100 rounded p-1 hover:bg-gray-200"
            onClick={() => setAuthenticated(!authenticated)}
          >
            toggle authenticated
          </button>
          <button
            onClick={() => setDisplayActions(!displayActions)}
            className="bg-gray-100 rounded p-1 hover:bg-gray-200"
          >
            toggle displayActions
          </button>
        </div>

        <main className="py-4 px-4 min-h-[calc(100vh-72px)]">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
