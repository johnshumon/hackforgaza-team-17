import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Menu from "./Menu";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-white"}>
        <div className="">
          <Link href={'/'} className="text-3xl font-medium p-3 block">Genocide watch</Link>
          <Menu />
        </div>

        <main className="z-10 px-5  pt-20">{children}</main>
      </body>
    </html>
  );
}
