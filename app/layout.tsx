import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "./components/Navbar";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <Navbar />
        <div className='pt-36'>{children}</div>

        <LoginModal />
        <SignupModal />
      </body>
    </html>
  );
}
