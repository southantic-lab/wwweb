"use client";

import Link from "next/link";
import { ArrowDownLeft, ArrowUpRight, MessageSquareText, Plus, ShoppingBag, Sparkles, TrendingDown } from "lucide-react";
import TaskList from "@/components/ui/task-list";
import GitHubActivity from "@/components/ui/github-activity";
import { LiveCounter } from "@/components/site/live-counter";
import { PageHead } from "@/components/site/account-shell";
import { Badge, CoinGlyph, Cover, GhostButton, Panel, PanelHeader, PrimaryButton, Sparkline, statusTone } from "@/components/site/primitives";
import { contributions, fmt, getProduct, purchases, transactions, user } from "@/lib/data";

const activity = contributions(11);

export default function AccountOverview() {
  return (
    <>
      <PageHead eyebrow="Dashboard" title={<>Good morning, <span className="font-display font-normal italic text-aurora">Elif.</span></>} sub="Here's what's happening with your balance and orders." />

      <div className="grid gap-4 xl:grid-cols-[1.35fr_1fr]">
        <div className="relative overflow-hidden rounded-[26px] bg-[#0d0f17] p-6 ring-1 ring-inset ring-white/[0.07] sm:p-7">
          <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-iris/25 blur-[90px]" />
          <div className="pointer-events-none absolute -bottom-32 left-10 size-72 rounded-full bg-mint/10 blur-[90px]" />
          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-[13px] text-muted-foreground">Available balance</p>
              <LiveCounter value={user.balance} decimals={2} prefix="$" duration={1} className="mt-2 text-[46px] font-semibold tracking-[-0.045em] sm:text-[56px]" />
              <p className="mt-1 flex items-center gap-2 text-[13px] text-muted-foreground">
                <Badge tone="amber" dot>${fmt(user.pending)} confirming</Badge> BTC deposit · 1/2 confirmations
              </p>
            </div>
            <Sparkline data={[3, 5, 4, 7, 6, 9, 8, 11, 10, 13]} className="hidden sm:block" />
          </div>
          <div className="relative mt-8 flex flex-wrap gap-3">
            <Link href="/account/deposit"><PrimaryButton><Plus className="size-4" /> Deposit crypto</PrimaryButton></Link>
            <Link href="/sms"><GhostButton><MessageSquareText className="size-4" /> Get SMS number</GhostButton></Link>
            <div className="ml-auto hidden items-center -space-x-2 sm:flex">
              {["USDT", "BTC", "ETH", "SOL"].map((c) => <CoinGlyph key={c} coin={c} size={30} />)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { l: "Orders", v: 48, d: 0, p: "", icon: ShoppingBag, t: "+6 this month", c: "#9d8cff" },
            { l: "Spent · 30d", v: user.spent30d, d: 2, p: "$", icon: ArrowUpRight, t: "−12% vs Oct", c: "#ff7aa8" },
            { l: "SMS received", v: 214, d: 0, p: "", icon: MessageSquareText, t: "98.6% success", c: "#5ee6d0" },
            { l: "Cashback", v: 46.3, d: 2, p: "$", icon: Sparkles, t: "Gold · 2%", c: "#f7b267" },
          ].map((k) => (
            <Panel key={k.l} className="flex flex-col justify-between gap-5 p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <span className="text-[12.5px] text-muted-foreground">{k.l}</span>
                <span className="grid size-7 place-items-center rounded-lg" style={{ background: `${k.c}1a`, color: k.c }}><k.icon className="size-3.5" /></span>
              </div>
              <div>
                <LiveCounter value={k.v} decimals={k.d} prefix={k.p} className="text-[24px] font-semibold tracking-[-0.035em] sm:text-[28px]" />
                <p className="mt-0.5 text-[11.5px] text-muted-foreground">{k.t}</p>
              </div>
            </Panel>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.35fr_1fr]">
        <Panel className="overflow-hidden">
          <PanelHeader title="Purchase activity" hint="Orders and SMS activations over the last 6 months" />
          <div className="overflow-x-auto px-5 pb-5 pt-4 scrollbar-none sm:px-6">
            <GitHubActivity
              contributions={activity}
              months={6}
              cellSize={13}
              accent="#9d8cff"
              label="Most bought in:"
              repos={[
                { name: "SMS verification", count: 214 },
                { name: "Business Manager", count: 18 },
                { name: "Profiles", count: 12 },
                { name: "Pages", count: 4 },
              ]}
            />
          </div>
        </Panel>

        <Panel>
          <PanelHeader title="Secure your account" hint="3 of 5 done · unlock withdrawals" />
          <div className="px-3 pb-4 pt-2 sm:px-4">
            <TaskList
              accent="#9d8cff"
              defaultTasks={[
                { id: "a", label: "Verify your email address", done: true },
                { id: "b", label: "Make your first crypto deposit", done: true },
                { id: "c", label: "Enable two-factor authentication" },
                { id: "d", label: "Add a backup recovery email" },
                { id: "e", label: "Set a withdrawal whitelist address" },
              ]}
            />
          </div>
        </Panel>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <Panel>
          <PanelHeader title="Recent purchases" action={<Link href="/account/purchases" className="text-[13px] text-iris">View all</Link>} />
          <div className="mt-2 flex flex-col px-3 pb-3">
            {purchases.slice(0, 4).map((o) => {
              const p = getProduct(o.slug)!;
              return (
                <Link key={o.id} href="/account/purchases" className="flex items-center gap-3 rounded-2xl px-3 py-3 transition-colors hover:bg-white/[0.03]">
                  <Cover product={p} className="size-12 shrink-0 rounded-xl" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-medium">{p.name}</p>
                    <p className="truncate text-[12px] text-muted-foreground">{p.edition} · {o.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[14px] font-semibold tabular">${fmt(o.price)}</p>
                    <Badge tone={statusTone(o.status)} className="mt-1 h-5 text-[10.5px]">{o.status}</Badge>
                  </div>
                </Link>
              );
            })}
          </div>
        </Panel>
        <Panel>
          <PanelHeader title="Wallet activity" action={<Link href="/account/transactions" className="text-[13px] text-iris">History</Link>} />
          <div className="mt-2 flex flex-col px-3 pb-3">
            {transactions.slice(0, 4).map((t) => (
              <div key={t.id} className="flex items-center gap-3 rounded-2xl px-3 py-3">
                <span className={`grid size-10 shrink-0 place-items-center rounded-full ${t.usd > 0 ? "bg-mint/10 text-mint" : "bg-white/[0.05] text-foreground/70"}`}>
                  {t.usd > 0 ? <ArrowDownLeft className="size-4" /> : <TrendingDown className="size-4" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-medium">{t.label}</p>
                  <p className="text-[12px] text-muted-foreground">{t.date}</p>
                </div>
                <div className="text-right">
                  <p className={`text-[14px] font-semibold tabular ${t.usd > 0 ? "text-mint" : ""}`}>{t.usd > 0 ? "+" : "−"}${fmt(Math.abs(t.usd))}</p>
                  <Badge tone={statusTone(t.status)} className="mt-1 h-5 text-[10.5px]">{t.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}
