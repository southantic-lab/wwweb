"use client";

import { useState } from "react";
import { Ban, Mail, Search, Wallet } from "lucide-react";
import { GooeyNav } from "@/components/ui/gooey-nav";
import GitHubActivity from "@/components/ui/github-activity";
import DeleteButton from "@/components/ui/delete-button";
import AnimatedCounter from "@/components/ui/animated-counter";
import { toast } from "@/components/ui/toast";
import { PageHead } from "@/components/site/account-shell";
import { Avatar, Badge, GhostButton, Panel, PanelHeader, PrimaryButton, statusTone } from "@/components/site/primitives";
import { contributions, customers, fmt, purchases, getProduct } from "@/lib/data";
import { cn } from "@/lib/utils";

const tabs = ["All", "Active", "Flagged", "Suspended"];
const tierColor = { Bronze: "#c08457", Silver: "#c0c4d0", Gold: "#f7b267", Platinum: "#c9bfff" };

export default function AdminCustomers() {
  const [tab, setTab] = useState(0);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(customers[0].id);
  const [credit, setCredit] = useState(0);
  const list = customers.filter((c) => (tab === 0 || c.status === tabs[tab]) && (c.name + c.email).toLowerCase().includes(q.toLowerCase()));
  const c = customers.find((x) => x.id === sel)!;

  return (
    <>
      <PageHead eyebrow="CRM" title={<>Customer <span className="font-display font-normal italic text-aurora">management.</span></>} sub={`${customers.length.toLocaleString()} shown · 8,317 active this month`} />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="-mx-5 overflow-x-auto px-5 scrollbar-none sm:mx-0 sm:px-0">
          <GooeyNav items={tabs} value={tab} onChange={setTab} size="sm" activeColor="#eceef3" activeLabelColor="#0b0a14" />
        </div>
        <label className="flex h-10 items-center gap-2 rounded-full bg-white/[0.03] px-4 ring-1 ring-inset ring-white/[0.08] sm:w-72">
          <Search className="size-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name or email" className="w-full bg-transparent text-[13.5px] outline-none placeholder:text-muted-foreground" />
        </label>
      </div>

      <div className="grid gap-4 2xl:grid-cols-[1fr_420px]">
        <Panel className="overflow-hidden">
          <div className="hidden grid-cols-[1fr_100px_110px_110px_80px_110px] gap-4 border-b border-white/[0.06] px-6 py-4 text-[11.5px] uppercase tracking-[0.12em] text-muted-foreground lg:grid">
            <span>Customer</span><span>Tier</span><span className="text-right">Balance</span><span className="text-right">Lifetime</span><span className="text-right">Orders</span><span>Status</span>
          </div>
          {list.map((x) => (
            <button
              key={x.id}
              onClick={() => setSel(x.id)}
              className={cn(
                "grid w-full grid-cols-[1fr_auto] items-center gap-4 border-b border-white/[0.04] px-4 py-3 text-left last:border-0 lg:grid-cols-[1fr_100px_110px_110px_80px_110px] lg:px-6",
                sel === x.id ? "bg-iris/[0.06]" : "hover:bg-white/[0.02]",
              )}
            >
              <span className="flex min-w-0 items-center gap-3">
                <Avatar name={x.name} hue={x.hue} size={36} />
                <span className="min-w-0">
                  <span className="block truncate text-[14px] font-medium">{x.name} <span className="ml-1 text-[11px] text-muted-foreground">{x.country}</span></span>
                  <span className="block truncate text-[12px] text-muted-foreground">{x.email}</span>
                </span>
              </span>
              <span className="hidden text-[12.5px] font-medium lg:block" style={{ color: tierColor[x.tier] }}>● {x.tier}</span>
              <span className="hidden text-right text-[13.5px] tabular lg:block">${fmt(x.balance)}</span>
              <span className="text-right text-[13.5px] font-semibold tabular lg:font-normal">${fmt(x.spent)}<span className="block text-[11px] font-normal text-muted-foreground lg:hidden">{x.orders} orders</span></span>
              <span className="hidden text-right text-[13.5px] tabular text-muted-foreground lg:block">{x.orders}</span>
              <span className="hidden lg:block"><Badge tone={statusTone(x.status)} dot>{x.status}</Badge></span>
            </button>
          ))}
        </Panel>

        <Panel className="self-start 2xl:sticky 2xl:top-24">
          <div className="relative overflow-hidden rounded-t-[22px] p-6">
            <div className="pointer-events-none absolute inset-0 opacity-60" style={{ background: `radial-gradient(circle at 20% 0%, ${c.hue}40, transparent 60%)` }} />
            <div className="relative flex items-center gap-4">
              <Avatar name={c.name} hue={c.hue} size={56} />
              <div className="min-w-0">
                <p className="truncate text-[18px] font-semibold tracking-[-0.02em]">{c.name}</p>
                <p className="truncate text-[12.5px] text-muted-foreground">{c.email} · {c.id}</p>
                <div className="mt-1.5 flex gap-1.5">
                  <Badge tone={statusTone(c.status)} dot>{c.status}</Badge>
                  <Badge tone="neutral">Since {c.joined}</Badge>
                </div>
              </div>
            </div>
            <div className="relative mt-6 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-white/[0.04] py-3"><AnimatedCounter value={c.balance + credit} decimals={2} prefix="$" className="justify-center text-[15px] font-semibold" /><p className="text-[11px] text-muted-foreground">Balance</p></div>
              <div className="rounded-xl bg-white/[0.04] py-3"><AnimatedCounter value={c.spent} decimals={0} prefix="$" className="justify-center text-[15px] font-semibold" /><p className="text-[11px] text-muted-foreground">Lifetime</p></div>
              <div className="rounded-xl bg-white/[0.04] py-3"><AnimatedCounter value={c.orders} className="justify-center text-[15px] font-semibold" /><p className="text-[11px] text-muted-foreground">Orders</p></div>
            </div>
          </div>
          <PanelHeader title="Activity" className="pt-0 sm:pt-0" />
          <div className="overflow-x-auto px-5 pb-4 pt-3 scrollbar-none sm:px-6">
            <GitHubActivity key={c.id} contributions={contributions(c.orders, 105)} months={3} cellSize={12} accent={c.hue} showMonths={false} label="Bought:" repos={[{ name: "Business Manager", count: Math.round(c.orders * 0.4) }, { name: "SMS verification", count: Math.round(c.orders * 0.6) }]} />
          </div>
          <div className="border-t border-white/[0.06] px-5 py-4 sm:px-6">
            <p className="mb-2 text-[12px] font-medium uppercase tracking-[0.12em] text-muted-foreground">Recent orders</p>
            {purchases.slice(0, 3).map((o) => (
              <div key={o.id} className="flex items-center justify-between py-1.5 text-[13px]">
                <span className="truncate">{getProduct(o.slug)!.name}</span>
                <span className="font-mono text-[12px] text-muted-foreground">${fmt(o.price)}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2 border-t border-white/[0.06] p-5 sm:p-6">
            <PrimaryButton className="h-10 px-4 text-[13px]" onClick={() => { setCredit((v) => v + 25); toast.success(`$25.00 credited to ${c.name}`); }}><Wallet className="size-4" /> Credit $25</PrimaryButton>
            <GhostButton className="h-10 px-4 text-[13px]" onClick={() => toast.info(`Email draft opened for ${c.name}`)}><Mail className="size-4" /> Email</GhostButton>
            <span className="ml-auto flex items-center gap-2 text-[12.5px] text-muted-foreground"><Ban className="size-4" /> Suspend</span>
            <DeleteButton onConfirm={() => toast.warning(`${c.name} suspended`)} />
          </div>
        </Panel>
      </div>
    </>
  );
}
