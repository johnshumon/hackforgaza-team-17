"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu as MenuIcon, X } from "react-feather";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className={`fixed cursor-pointer top-0 right-0 p-3 z-50 text-2xl ${
          isOpen ? "text-white" : "text-black"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Close" : "Menu"}
      </button>
      <aside
        className={`fixed top-0 left-0 bg-red-950 h-screen z-40 ${
          isOpen ? "w-full" : "w-0"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div className="h-full overflow-y-auto">
          <ul className="space-y-6 text-white font-medium text-4xl p-8 pt-20">
            <li>
              <Link
                href={"/dashboard"}
                className="transition-all hover:opacity-75"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link href={"/about"} className="transition-all hover:opacity-75">
                About
              </Link>
            </li>
            <li>
              <Link
                href={"/privacy"}
                className="transition-all hover:opacity-75"
              >
                Privacy
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
