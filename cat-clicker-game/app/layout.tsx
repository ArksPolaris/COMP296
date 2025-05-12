'use client';
import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./components/navbar";
import Navbar from "./components/navbar";
import { AchievementsWrapper } from "./components/AchievementsWrapper";
import { ReadoutsProvider } from "./components/console";
import { BalanceProvider } from "./components/contexts/balanceContext";
import { Auto } from "./components/save";
import { UpgradeProvider } from "./components/contexts/upgradeContext";
import { ClickProvider } from "./components/contexts/clickContext";
import { PowerUpProvider } from "./components/contexts/powerupsContext";




const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 

{

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReadoutsProvider>
          <BalanceProvider>
            <UpgradeProvider>
              <AchievementsWrapper>
                <PowerUpProvider>
                  <ClickProvider>
                    <Auto />
                    <Navbar />
                    <br />
                    {children}
                  </ClickProvider>
                </PowerUpProvider>
              </AchievementsWrapper>
            </UpgradeProvider>
          </BalanceProvider>
        </ReadoutsProvider>
      </body>
    </html>
  );
}
