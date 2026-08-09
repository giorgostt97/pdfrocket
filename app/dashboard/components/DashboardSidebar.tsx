"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "🏠 Dashboard", href: "/dashboard" },
  { name: "📄 History", href: "/dashboard/history" },
  { name: "⭐ Favorites", href: "/dashboard/favorites" },
  { name: "💳 Billing", href: "/dashboard/billing" },
  { name: "⚙ Settings", href: "/dashboard/settings" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full min-w-0 shrink-0 border-b border-zinc-800 bg-zinc-950 p-4 lg:w-64 lg:border-b-0 lg:border-r lg:p-6">
      <h2 className="mb-4 text-2xl font-bold text-white lg:mb-8">
        Dashboard
      </h2>

      <nav className="flex w-full min-w-0 gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-3 lg:overflow-visible">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`shrink-0 whitespace-nowrap rounded-2xl px-4 py-3 text-sm transition lg:px-5 lg:py-4 lg:text-base ${
              pathname === link.href
                ? "bg-blue-600 text-white"
                : "bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}