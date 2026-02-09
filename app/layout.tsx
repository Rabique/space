import type { Metadata } from "next";
import { Geist, Geist_Mono, Indie_Flower } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const indieFlower = Indie_Flower({
  weight: "400",
  variable: "--font-indie-flower",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "네일아트 - AI 유튜브 섬네일 생성기",
  description: "AI가 만드는 완벽한 유튜브 섬네일. 클릭률을 높이는 매력적인 섬네일을 몇 초 만에 생성하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${indieFlower.variable} antialiased`}
        style={{ fontFamily: "var(--font-indie-flower), cursive" }}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
