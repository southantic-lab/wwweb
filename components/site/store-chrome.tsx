"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Compass, House, Search, ShieldCheck, Sparkles, UserRound, Wallet, Command, Zap, Package, MessageSquareText } from "lucide-react";
import { GooeyNav } from "@/components/ui/gooey-nav";
import NotificationBell from "@/components/ui/notification-bell";
import AnimatedCounter from "@/components/ui/animated-counter";
import { Avatar, Logo } from "./primitives";
import { user } from "@/lib/data";
import { cn } from "@/lib/utils";

const desktopNav = [
  { label: "Discover", href: "/" },
  { label: "Browse", href: "/products" },
  { label: "SMS", href: "/sms" },
  { label: "Account", href: "/account" },
];

function activeDesktop(path: string) {
  if (path === "/") return 0;
  if (path.startsWith("/products")) return 1;
  if (path.startsWith("/sms")) return 2;
  if (path.startsWith("/account")) return 3;
  return -1;
}

const notifications = [
  { icon: Zap, tone: "#5ee6d0", title: "Deposit credited", body: "500.00 USDT added to your balance", time: "2m" },
  { icon: Package, tone: "#9d8cff", title: "Order delivered", body: "Business Manager · Verified is in your library", time: "1h" },
  { icon: Sparkles, tone: "#f7b267", title: "Price drop", body: "UK SMS numbers are 30% off for 48 hours", time: "5h" },
];

export function NotificationsMenu({ count = 3 }: { count?: number }) {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setUnread(count), 900);
    return () => clearTimeout(t);
  }, [count]);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <NotificationBell
        count={unread}
        size={40}
        color="violet"
        className="bg-white/[0.04] ring-1 ring-inset ring-white/10 hover:bg-white/[0.07]"
        onClick={() => {
          setOpen((o) => !o);
          setUnread(0);
        }}
      />
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="absolute right-0 top-12 z-50 w-[320px] origin-top-right rounded-2xl bg-[#11131b]/95 p-2 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl"
          >
            <p className="px-3 pb-2 pt-2 text-[12px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Notifications</p>
            {notifications.map((n) => (
              <div key={n.title} className="flex gap-3 rounded-xl px-3 py-2.5 hover:bg-white/[0.04]">
                <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full" style={{ background: `${n.tone}1f`, color: n.tone }}>
                  <n.icon className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] font-medium text-foreground">{n.title}</p>
                  <p className="truncate text-[12.5px] text-muted-foreground">{n.body}</p>
                </div>
                <span className="text-[11px] text-muted-foreground">{n.time}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function BalancePill({ className }: { className?: string }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setV(user.balance), 400);
    return () => clearTimeout(t);
  }, []);
  return (
    <Link
      href="/account/deposit"
      className={cn(
        "group inline-flex h-10 items-center gap-2 rounded-full bg-white/[0.04] pl-1.5 pr-3.5 ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/[0.07]",
        className,
      )}
    >
      <span className="grid size-7 place-items-center rounded-full bg-mint/15 text-mint">
        <Wallet className="size-3.5" />
      </span>
      <AnimatedCounter value={v} decimals={2} prefix="$" className="text-[13.5px] font-semibold text-foreground" />
    </Link>
  );
}

export function StoreHeader() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background,box-shadow] duration-300",
        scrolled ? "bg-[#07080c]/75 shadow-[0_1px_0_rgba(255,255,255,.06)] backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[68px] max-w-[1320px] items-center gap-6 px-5 lg:h-[76px] lg:px-8">
        <Link href="/" aria-label="Nocta home">
          <Logo />
        </Link>

        <div className="hidden lg:block">
          <GooeyNav items={desktopNav} value={activeDesktop(path)} size="sm" activeColor="#eceef3" activeLabelColor="#0b0a14" />
        </div>

        <button className="ml-auto hidden h-10 w-[260px] items-center gap-2.5 rounded-full bg-white/[0.03] px-4 text-[13.5px] text-muted-foreground ring-1 ring-inset ring-white/[0.08] transition-colors hover:bg-white/[0.06] xl:flex">
          <Search className="size-4" />
          Search listings
          <span className="ml-auto inline-flex items-center gap-0.5 rounded-md bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10.5px]">
            <Command className="size-3" />K
          </span>
        </button>

        <div className="ml-auto flex items-center gap-2.5 xl:ml-0">
          <Link
            href="/admin"
            className="hidden h-10 items-center gap-1.5 rounded-full px-3 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground lg:inline-flex"
          >
            <ShieldCheck className="size-4" /> Admin
          </Link>
          <BalancePill className="hidden sm:inline-flex" />
          <NotificationsMenu />
          <Link href="/account" className="hidden rounded-full ring-2 ring-white/10 transition-shadow hover:ring-iris/50 sm:block">
            <Avatar name={user.name} size={40} />
          </Link>
        </div>
      </div>
    </header>
  );
}

const mobileNav = [
  { label: "Home", href: "/", icon: <House /> },
  { label: "Browse", href: "/products", icon: <Compass /> },
  { label: "SMS", href: "/sms", icon: <MessageSquareText /> },
  { label: "Me", href: "/account", icon: <UserRound /> },
];

function activeMobile(path: string) {
  if (path === "/") return 0;
  if (path.startsWith("/products")) return 1;
  if (path.startsWith("/sms")) return 2;
  if (path.startsWith("/account")) return 3;
  return 0;
}

export function MobileTabBar() {
  const path = usePathname();
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center pb-[max(14px,env(safe-area-inset-bottom))] pt-6 lg:hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07080c] via-[#07080c]/80 to-transparent" />
      <div className="pointer-events-auto relative rounded-[18px] bg-[#07080c]/60 p-1 shadow-[0_10px_40px_-10px_rgba(0,0,0,.8)] backdrop-blur-xl">
        <GooeyNav items={mobileNav} value={activeMobile(path)} size="sm" activeColor="#9d8cff" activeLabelColor="#0b0a14" />
      </div>
    </div>
  );
}

export function StoreFooter() {
  const cols = [
    { h: "Marketplace", l: ["SMS verification", "Business Manager", "Profiles", "Pages"] },
    { h: "Account", l: ["Dashboard", "Deposit crypto", "My library", "Transactions"] },
    { h: "Company", l: ["About", "Affiliates", "Press", "Careers"] },
    { h: "Support", l: ["Help center", "Refund policy", "Status", "Contact"] },
  ];
  return (
    <footer className="relative mt-24 border-t border-white/[0.06] pb-32 pt-14 lg:pb-14">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 lg:grid-cols-[1.4fr_repeat(4,1fr)] lg:px-8">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-[13.5px] leading-relaxed text-muted-foreground">
            SMS numbers and verified accounts, delivered in seconds. Pay with USDT, BTC, ETH or SOL. Every order is backed by our 72h replacement guarantee.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:contents">
          {cols.map((c) => (
            <div key={c.h}>
              <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-muted-foreground">{c.h}</p>
              <ul className="mt-4 space-y-2.5">
                {c.l.map((l) => (
                  <li key={l} className="text-[13.5px] text-foreground/80 transition-colors hover:text-foreground">
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-[1320px] flex-col gap-2 px-5 text-[12px] text-muted-foreground sm:flex-row sm:justify-between lg:px-8">
        <span>© 2026 Nocta Market. Design prototype — demo data only.</span>
        <span>Built with Rare UI components</span>
      </div>
    </footer>
  );
}
