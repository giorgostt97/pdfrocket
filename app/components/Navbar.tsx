"use client";

import Link from "next/link";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

const tools = [
  { name: "Merge PDF", href: "/merge" },
  { name: "Split PDF", href: "/split" },
  { name: "Rotate PDF", href: "/rotate" },
  { name: "JPG to PDF", href: "/jpg-to-pdf" },
  { name: "Delete Pages", href: "/delete-pages" },
  { name: "Extract Pages", href: "/extract-pages" },
  { name: "Watermark PDF", href: "/watermark" },
  { name: "Reorder Pages", href: "/reorder" },
  { name: "Page Numbers", href: "/page-numbers" },
  { name: "Duplicate Pages", href: "/duplicate-pages" },
  { name: "Reverse Pages", href: "/reverse-pages" },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-black">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <Link
          href="/"
          className="text-2xl font-bold text-white"
        >
          <div className="flex items-center gap-3">
  <img
    src="/logo.svg"
    alt="PDFRocket"
    className="h-9 w-9"
  />

  <span className="text-2xl font-bold">
    PDFRocket
  </span>
</div>
        </Link>

        <div className="flex items-center gap-8">

          <Menu as="div" className="relative">

            <MenuButton className="flex items-center gap-2 text-white hover:text-blue-400">
              Tools
              <ChevronDown size={18} />
            </MenuButton>

            <MenuItems
              anchor="bottom"
              className="mt-3 w-64 rounded-2xl border border-zinc-800 bg-zinc-900 p-2 shadow-2xl focus:outline-none"
            >
              {tools.map((tool) => (
                <MenuItem key={tool.name}>
                  {({ focus }) => (
                    <Link
                      href={tool.href}
                      className={`block rounded-xl px-4 py-3 text-white ${
                        focus ? "bg-zinc-800" : ""
                      }`}
                    >
                      {tool.name}
                    </Link>
                  )}
                </MenuItem>
              ))}
            </MenuItems>

          </Menu>

          <Link
            href="/pricing"
            className="text-white hover:text-blue-400"
          >
            Pricing
          </Link>
          
          <Link
  href="/about"
  className="text-white hover:text-blue-400"
>
  About
</Link>

          <button className="rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700">
            Go Pro
          </button>

        </div>

      </div>
    </nav>
  );
}