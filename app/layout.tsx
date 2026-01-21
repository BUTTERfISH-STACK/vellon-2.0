import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Layout from "../components/Layout";
import ReferralTracker from "../components/ReferralTracker";
import Providers from "../components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vellon 2.0 - Premium SaaS Platform",
  description: "A premium SaaS platform for CV optimization and redesign",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] opacity-5 blur-3xl animate-pulse-slow" style={{ backgroundImage: "url('/vellon-watermark.jpg')", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}></div>
          </div>
        </div>
        <Providers>
          <Suspense fallback={null}>
            <ReferralTracker />
          </Suspense>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
