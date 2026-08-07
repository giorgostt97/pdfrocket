"use client";

import Link from "next/link";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import {
  Show,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

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
  { name: "PDF Information", href: "/pdf-info" },
  { name: "Edit Metadata", href: "/edit-metadata" },
  { name: "Remove Metadata", href: "/remove-metadata" },
  { name: "PDF Thumbnails", href: "/pdf-thumbnails" },
  { name: "PDF to JPG", href: "/pdf-to-jpg" },
  { name: "PDF to PNG", href: "/pdf-to-png" },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-black/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/logo.svg"
            alt="PDFRocket"
            className="h-9 w-9"
          />

          <span className="hidden text-2xl font-bold text-white sm:block">
            PDFRocket
          </span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          {/* Tools */}
          <Menu as="div" className="relative">
            <MenuButton className="flex items-center gap-2 text-white hover:text-blue-400">
              Tools
              <ChevronDown size={18} />
            </MenuButton>

            <MenuItems
              anchor="bottom"
              className="mt-3 max-h-[500px] w-64 overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-900 p-2 shadow-2xl focus:outline-none"
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
            className="hidden text-white hover:text-blue-400 md:block"
          >
            Pricing
          </Link>

          <Link
            href="/about"
            className="hidden text-white hover:text-blue-400 md:block"
          >
            About
          </Link>

          {/* Logged Out */}
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="hidden rounded-xl border border-zinc-700 px-5 py-2 text-white transition hover:border-zinc-500 md:block">
                Sign In
              </button>
            </SignInButton>

            <Link
              href="/sign-up"
              className="rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
            >
              Get Started
            </Link>
          </Show>

          {/* Logged In */}
          <Show when="signed-in">
            <Link
              href="/dashboard"
              className="rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
            >
              Dashboard
            </Link>

            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10",
                },
              }}
            />
          </Show>
        </div>
      </div>
    </nav>
  );
}