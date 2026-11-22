"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { BounceSidebar } from "@/components/ui/bounce-sidebar";
import { GooeyNav } from "@/components/ui/gooey-nav";
import { Avatar, Badge } from "./primitives";
import { user } from "@/lib/data";

const items = [
  { label: "Account", heading: true as const },
  { label: "Overview", href: "/account" },
  { label: "Deposit crypto", href: "/account/deposit" },
  { label: "My purchases", href: "/account/purchases" },
  { label: "Transactions", href: "/account/transactions" },
  { label: "Shop", heading: true as const },
  { label: "SMS verification", href: "/sms" },
  { label: "Browse listings", href: "/products" },
];

const mobile = [
  { label: "Overview", href: "/account" },
  { label: "Deposit", href: "/account/deposit" },
  { label: "Purchases", href: "/account/purchases" },
  { label: "History", href: "/account/transactions" },
];

export function AccountShell({ children }: { children: ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const idx = items.findIndex((i) => "href" in i && i.href === path);
  const midx = mobile.findIndex((i) => i.href === path);

  return (
    <div className="mx-auto grid max-w-[1320px] gap-8 px-5 pt-2 lg:grid-cols-[240px_1fr] lg:gap-10 lg:px-8 lg:pt-6">
      <aside className="hidden lg:block">
        <div className="sticky top-28 flex flex-col gap-8">
          <div className="flex items-center gap-3 rounded-[20px] panel p-3.5">
            <Avatar name={user.name} size={42} />
            <div className="min-w-0">
              <p className="truncate text-[14px] font-semibold">{user.name}</p>
              <Badge tone="amber" className="mt-1 h-5 text-[10.5px]">★ {user.tier} member</Badge>
            </div>
          </div>
          <BounceSidebar
            items={items}
            value={idx === -1 ? 1 : idx}
            onChange={(i) => {
              const it = items[i];
              if ("href" in it && it.href) router.push(it.href);
            }}
            dotColor="#9d8cff"
          />
          <div className="rounded-[20px] bg-[linear-gradient(140deg,rgba(157,140,255,.18),rgba(94,230,208,.08))] p-4 ring-1 ring-inset ring-white/[0.08]">
            <p className="text-[13px] font-semibold">Reach Platinum</p>
            <p className="mt-1 text-[12px] text-muted-foreground">Spend $880 more for 4% cashback and priority replacements.</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[72%] rounded-full bg-aurora" /></div>
          </div>
        </div>
      </aside>
      <div className="min-w-0">
        <div className="-mx-5 mb-5 overflow-x-auto px-5 scrollbar-none lg:hidden">
          <GooeyNav items={mobile} value={midx === -1 ? 0 : midx} size="sm" activeColor="#eceef3" activeLabelColor="#0b0a14" />
        </div>
        {children}
      </div>
    </div>
  );
}

export function PageHead({ eyebrow, title, sub, action }: { eyebrow: string; title: ReactNode; sub?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:mb-8">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-iris">{eyebrow}</p>
        <h1 className="mt-2 text-[30px] font-semibold leading-none tracking-[-0.045em] sm:text-[40px]">{title}</h1>
        {sub && <p className="mt-2 text-[14px] text-muted-foreground">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export { Link };
