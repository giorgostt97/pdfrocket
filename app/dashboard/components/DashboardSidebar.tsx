"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "🏠 Dashboard",
    href: "/dashboard",
  },
  {
    name: "📄 History",
    href: "/dashboard/history",
  },
  {
    name: "⭐ Favorites",
    href: "/dashboard/favorites",
  },
  {
    name: "💳 Billing",
    href: "/dashboard/billing",
  },
  {
    name: "⚙ Settings",
    href: "/dashboard/settings",
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 rounded-3xl border border-zinc-700 bg-zinc-900 p-6 shadow-lg">

      <h2 className="mb-8 text-2xl font-bold text-white">
        Dashboard
      </h2>

      <nav className="space-y-3">

        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block rounded-2xl px-5 py-4 transition ${
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