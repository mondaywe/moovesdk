"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  href: string;
  icon?: string;
}

const navigation: NavItem[] = [
  {
    title: "Introduction",
    href: "/",
    icon: "📚"
  },
  {
    title: "Getting Started",
    href: "/getting-started",
    icon: "🚀"
  },
  {
    title: "Solana Integration",
    href: "/solana",
    icon: "☀️"
  },
  {
    title: "AI Integration",
    href: "/ai",
    icon: "🤖"
  },
  {
    title: "Plugins",
    href: "/plugins",
    icon: "🔌"
  },
  {
    title: "Advanced",
    href: "/advanced",
    icon: "⚡"
  },
  {
    title: "EVM Support",
    href: "/evm",
    icon: "🔗"
  }
];

function NavLink({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const isActive = pathname === item.href || 
    (item.href !== "/" && pathname?.startsWith(item.href));

  return (
    <div className="px-2">
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors",
          isActive
            ? "text-white bg-zinc-800"
            : "text-gray-400 hover:text-white hover:bg-zinc-800/50"
        )}
      >
        {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
        <span className="truncate">{item.title}</span>
      </Link>
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="w-64 bg-zinc-900 border-r border-zinc-800 h-screen sticky top-0 overflow-y-auto">
      <div className="p-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white">
          <img src="/logo.svg" alt="PATH Logo" className="w-8 h-8" />
          PATH
        </Link>
      </div>
      <nav className="mt-4 space-y-1">
        {navigation.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </nav>
    </aside>
  );
}
