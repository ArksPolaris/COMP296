import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./components/navbar";
import Navbar from "./components/navbar";
import { ReadoutsProvider } from "./components/console";
import { Auto } from "./components/save";
import { AchievementsProvider } from "./components/achievementsContext";
import { moneySpent, stickyBalance } from "./components/balance";
import { catIds, shelters } from "./components/upgrade";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cat Clicker Game",
  description: "A game where you click on  to earn points",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 

{
  type Stats = {
    moneyMade: number;
    catsOwned: number;
    sheltersOwned: number;
    moneySpent: number;
  };

  const stats: Stats = {
      moneyMade: stickyBalance,
      catsOwned: catIds,
      sheltersOwned: shelters,
      moneySpent: moneySpent,
    };


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReadoutsProvider>
          <AchievementsProvider stats={stats}>
            <Navbar />
            <Auto />
            {children}
          </AchievementsProvider>
        </ReadoutsProvider>
       
      </body>
    </html>
  );
}
