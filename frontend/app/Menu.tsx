"use client";
import Link from "next/link";
import { useState } from "react";
import {
  Facebook,
  Instagram,
  Menu as MenuIcon,
  Twitter,
  X,
} from "react-feather";

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
          <div className="inline-block">
            <div className={`my-[4px] block w-[35px] h-[2px] transition-transform duration-500 ${isOpen ? "-rotate-45 translate-x-[2px] translate-y-[4px] bg-white":"bg-black"}`}></div>
            <div className={`my-[4px] block w-[35px] h-[2px] transition-transform duration-500 ${isOpen ? "rotate-45 translate-x-[2px] -translate-y-[2.5px] bg-white":"bg-black"}`}></div>
          </div>
      </button>
      <aside
        className={`transition-all duration-500 fixed top-0 left-0 bg-red-950 w-full z-40 flex flex-col justify-between ${
          isOpen ? "h-full" : "h-0 translate-y-full scale-[90%] blur-sm"
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
          <div className="h-10 flex justify-center gap-6 text-white mb-10">
          <a href="https://facebook.com/" target="_blank" className="p-3">
            <Facebook size={30} fill="white" strokeWidth={0} />{" "}
          </a>
          <a href="https://instagram.com/" target="_blank" className="p-3">
            <Instagram size={30} />
          </a>

          <a href="https://x.com/" target="_blank" className="p-3">
            <span className="text-[30px] leading-[30px] pb-1">𝕏</span>
          </a>
        </div>ƒ
        </div>
        
      </aside>
    </>
  );
}
