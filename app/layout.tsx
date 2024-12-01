import type { Metadata } from "next";
import { Cormorant_Infant, UnifrakturCook } from "next/font/google";
import "./globals.css";

import Navbar from "./components/Navbar";

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

export const metadata: Metadata = {
  title: "Haunted Hotel",
  description: "Haunted Hotel Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = <p>Content Test</p>;
  return (
    <html lang='en'>
      <body
        className={`${cormorant.variable} ${unifraktur.variable} bg-[#6c53a4] flex h-screen flex-col`}
      >
        <Navbar />
        <div className='flex-1'>{children}</div>
      </body>
    </html>
  );
}
