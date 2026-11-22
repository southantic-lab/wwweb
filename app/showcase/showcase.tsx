"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ExternalLink, Monitor, Smartphone } from "lucide-react";
import { GooeyNav } from "@/components/ui/gooey-nav";
import { Logo } from "@/components/site/primitives";
import { cn } from "@/lib/utils";

const pages = [
  { group: "Storefront", n: "01", name: "Homepage", path: "/" },
  { group: "Storefront", n: "02", name: "Product listing", path: "/products" },
  { group: "Storefront", n: "03", name: "Product details", path: "/products/bm-verified" },
  { group: "Storefront", n: "+", name: "SMS verification", path: "/sms" },
  { group: "Customer", n: "04", name: "Customer dashboard", path: "/account" },
  { group: "Customer", n: "05", name: "Crypto deposit", path: "/account/deposit" },
  { group: "Customer", n: "06", name: "My purchases", path: "/account/purchases" },
  { group: "Customer", n: "07", name: "Transaction history", path: "/account/transactions" },
  { group: "Admin", n: "08", name: "Admin dashboard", path: "/admin" },
  { group: "Admin", n: "09", name: "Product management", path: "/admin/products" },
  { group: "Admin", n: "10", name: "Stock inventory", path: "/admin/codes" },
  { group: "Admin", n: "11", name: "Crypto wallet settings", path: "/admin/wallets" },
  { group: "Admin", n: "12", name: "Customer management", path: "/admin/customers" },
];

const rare = [
  "gooey-nav", "fluid-orb", "animated-counter", "notification-bell", "toast", "otp-input", "password-input", "delete-button",
  "faq", "task-list", "github-activity", "bounce-sidebar", "hook-sidebar", "proximity-sidebar", "family-drawer", "folder-component",
  "step-player", "scroll-progress", "rail-toc", "code-block", "duration-picker", "matrix-orb", "ai-status", "streaming-response",
  "prompt-box", "grid-reveal", "gravity-letters", "emoji-reaction",
];

function Frame({ path, width, height, label, icon }: { path: string; width: number; height: number; label: string; icon: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(Math.min(1, e.contentRect.width / width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);
  return (
    <div className="flex min-w-0 flex-col gap-3">
      <div className="flex items-center justify-between text-[12.5px] text-muted-foreground">
        <span className="flex items-center gap-2">{icon} {label} · {width}px</span>
        <a href={path} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-foreground">Open <ExternalLink className="size-3.5" /></a>
      </div>
      <div ref={ref} className="w-full">
        <div className="overflow-hidden rounded-[22px] bg-black ring-1 ring-white/10 shadow-[0_40px_80px_-40px_rgba(0,0,0,.9)]" style={{ height: height * scale }}>
          <iframe key={path} src={path} title={label} style={{ width, height, transform: `scale(${scale})`, transformOrigin: "0 0", border: 0 }} />
        </div>
      </div>
    </div>
  );
}

export function Showcase() {
  const [i, setI] = useState(0);
  const p = pages[i];
  const groups = ["Storefront", "Customer", "Admin"];
  return (
    <div className="mx-auto max-w-[1680px] px-5 py-8 lg:px-10">
      <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Logo />
          <h1 className="mt-6 text-[36px] font-semibold leading-none tracking-[-0.045em] sm:text-[52px]">
            Design <span className="font-display font-normal italic text-aurora">showcase.</span>
          </h1>
          <p className="mt-3 max-w-xl text-[14.5px] text-muted-foreground">Live, interactive prototype — 12 pages plus SMS verification, rendered at 1440px and 390px. Everything you see runs on real Rare UI components.</p>
        </div>
        <div className="overflow-x-auto scrollbar-none">
          <GooeyNav items={groups} value={groups.indexOf(p.group)} onChange={(g) => setI(pages.findIndex((x) => x.group === groups[g]))} size="sm" activeColor="#9d8cff" activeLabelColor="#0b0a14" />
        </div>
      </header>

      <div className="mt-8 grid gap-8 xl:grid-cols-[260px_1fr]">
        <nav className="flex gap-2 overflow-x-auto pb-2 scrollbar-none xl:flex-col xl:overflow-visible">
          {groups.map((g) => (
            <div key={g} className="contents xl:block">
              <p className="hidden pb-2 pt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-iris first:pt-0 xl:block">{g}</p>
              {pages.map((x, k) =>
                x.group === g ? (
                  <button
                    key={x.path}
                    onClick={() => setI(k)}
                    className={cn("flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13.5px] transition-colors xl:w-full", i === k ? "bg-white/[0.07] text-foreground" : "text-muted-foreground hover:bg-white/[0.03] hover:text-foreground")}
                  >
                    <span className="font-mono text-[11px] text-iris">{x.n}</span>
                    {x.name}
                  </button>
                ) : null,
              )}
            </div>
          ))}
          <div className="mt-6 hidden rounded-2xl bg-white/[0.03] p-4 ring-1 ring-inset ring-white/[0.06] xl:block">
            <p className="text-[12.5px] font-medium">Rare UI components in use</p>
            <p className="mt-0.5 text-[11.5px] text-muted-foreground">Installed from the @rare-ui registry</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {rare.map((r) => <span key={r} className="rounded-md bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10.5px] text-foreground/75">{r}</span>)}
            </div>
          </div>
        </nav>

        <div className="grid min-w-0 items-start gap-6 lg:grid-cols-[1fr_390px]">
          <Frame path={p.path} width={1440} height={900} label="Desktop" icon={<Monitor className="size-4" />} />
          <div className="mx-auto w-full max-w-[390px]">
            <Frame path={p.path} width={390} height={844} label="Mobile" icon={<Smartphone className="size-4" />} />
          </div>
        </div>
      </div>
      <p className="mt-10 text-center text-[12px] text-muted-foreground">
        Prototype only — no real payments, database or authentication. <Link href="/" className="text-iris">Open storefront</Link>
      </p>
    </div>
  );
}
