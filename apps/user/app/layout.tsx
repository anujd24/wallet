import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "../providers";
import { AppbarClient } from "../components/AppbarClient";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "PayPAY",
  description: "Simple Wallet App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
      {/* <AppbarClient /> */}
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <div>
          <AppbarClient />
          {children}
          </div>
        </body>
      </Providers>
    </html>
  );
}
