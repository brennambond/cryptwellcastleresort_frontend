import type { Metadata } from "next";
import {
  Almendra,
  Cormorant_Infant,
  Germania_One,
  UnifrakturCook,
} from "next/font/google";
import "./globals.css";

import Navbar from "./components/Navbar";
import Header from "./components/header/Header";
import Footer from "./components/Footer";
import LoginModal from "./components/header/LoginModal";
import SearchModal from "./components/header/SearchModal";
import SignupModal from "./components/header/SignupModal";

const cormorant = Cormorant_Infant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});
const unifraktur = UnifrakturCook({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-unifraktur",
});
const almendra = Almendra({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-almendra",
});
const germania = Germania_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-germania",
});

export const metadata: Metadata = {
  title: "Haunted Hotel",
  description: "Haunted Hotel Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${cormorant.variable} ${unifraktur.variable} ${almendra.variable} ${germania.variable} bg-gray-800 flex h-screen flex-col`}
      >
        <Header />
        <div className='flex-1'>{children}</div>
        <LoginModal />
        <SearchModal />
        <SignupModal />
        <Footer />
      </body>
    </html>
  );
}
