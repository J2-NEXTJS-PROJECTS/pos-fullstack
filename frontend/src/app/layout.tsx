import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { AuthModal } from '@/components/auth/AuthModal';

const outfit = Outfit({ subsets: ["latin"] });
//console.log(outfit.className);
export const metadata: Metadata = {
  title: "POS - Next.js",
  description: "POS - Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} bg-gray-200`}>
        <Providers>
          {children}
          <AuthModal />
        </Providers>
        </body>
    </html>
  );
}
