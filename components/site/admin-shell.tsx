"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { HookSidebar } from "@/components/ui/hook-sidebar";
import { GooeyNav } from "@/components/ui/gooey-nav";
import AiStatus from "@/components/ui/ai-status";
import { NotificationsMenu } from "./store-chrome";
import { Avatar, Logo } from "./primitives";

const nav = [
  { label: "Dashboard", href: "/admin" },
  { label: "Products", href: "/admin/products" },
  { label: "Stock inventory", href: "/admin/codes" },
  { label: "Crypto wallets", href: "/admin/wallets" },
  { label: "Customers", href: "/admin/customers" },
];

function SyncStatus() {
  const [state, setState] = useState<"researching" | "analyzing" | "done">("researching");
  useEffect(() => {
    const seq: ("researching" | "analyzing" | "done")[] = ["researching", "analyzing", "done"];
    let i = 0;
    const t = setInterval(() => {
      i = (i + 1) % 4;
      setState(seq[Math.min(i, 2)]);
    }, 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <AiStatus
      state={state}
      label={state === "researching" ? "Validating new stock" : state === "analyzing" ? "Checking deposits" : "All systems synced"}
      detail={state === "researching" ? "412 accounts" : state === "analyzing" ? "4 chains" : undefined}
      className="text-[13px] text-foreground/90"
    />
  );
}

export function AdminShell({ children }: { children: ReactNode }) {
  const path = usePathname();
  const idx = Math.max(0, nav.findIndex((n) => n.href === path));
  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 hidden h-screen w-[264px] shrink-0 flex-col border-r border-white/[0.06] bg-[#08090d] px-6 py-6 lg:flex">
        <Link href="/admin" className="flex items-center gap-2">
          <Logo />
          <span className="rounded-md bg-iris/15 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-iris">Admin</span>
        </Link>
        <div className="mt-10">
          <HookSidebar items={nav} label="Operations" value={idx} color="#9d8cff" />
        </div>
        <div className="mt-auto flex flex-col gap-4">
          <div className="rounded-2xl bg-white/[0.03] p-4 ring-1 ring-inset ring-white/[0.06]">
            <p className="text-[12px] text-muted-foreground">Hot wallet float</p>
            <p className="mt-1 text-[20px] font-semibold tracking-[-0.03em]">$372,799</p>
            <div className="mt-3 flex h-1.5 overflow-hidden rounded-full">
              <span className="w-[13%] bg-mint" /><span className="w-[48%] bg-amber" /><span className="w-[22%] bg-iris" /><span className="w-[17%] bg-rose" />
            </div>
          </div>
          <Link href="/" className="flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Back to storefront</Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#07080c]/80 backdrop-blur-xl">
          <div className="flex h-16 items-center gap-4 px-5 lg:h-[72px] lg:px-8">
            <Link href="/admin" className="lg:hidden"><Logo compact /></Link>
            <div className="hidden md:block"><SyncStatus /></div>
            <button className="ml-auto hidden h-10 w-[280px] items-center gap-2 rounded-full bg-white/[0.03] px-4 text-[13px] text-muted-foreground ring-1 ring-inset ring-white/[0.08] xl:flex">
              <Search className="size-4" /> Search orders, customers, stock…
            </button>
            <div className="ml-auto flex items-center gap-3 xl:ml-0">
              <NotificationsMenu count={7} />
              <div className="flex items-center gap-2.5">
                <Avatar name="Deniz Kaya" hue="#5ee6d0" size={38} />
                <div className="hidden leading-tight sm:block">
                  <p className="text-[13px] font-medium">Deniz Kaya</p>
                  <p className="text-[11px] text-muted-foreground">Owner</p>
                </div>
              </div>
            </div>
          </div>
          <div className="-mt-1 overflow-x-auto px-5 pb-3 scrollbar-none lg:hidden">
            <GooeyNav items={nav.map((n) => ({ ...n, label: n.label.replace("Stock inventory", "Stock").replace("Crypto wallets", "Wallets") }))} value={idx} size="xs" activeColor="#9d8cff" activeLabelColor="#0b0a14" />
          </div>
        </header>
        <main className="flex-1 px-5 pb-16 pt-6 lg:px-8 lg:pt-8">{children}</main>
      </div>
    </div>
  );
}
