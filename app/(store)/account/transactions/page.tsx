"use client";

import { useState } from "react";
import { ArrowDownLeft, ArrowUpRight, Download, Gift, RotateCcw } from "lucide-react";
import { GooeyNav } from "@/components/ui/gooey-nav";
import { toast } from "@/components/ui/toast";
import { LiveCounter } from "@/components/site/live-counter";
import { PageHead } from "@/components/site/account-shell";
import { Badge, CoinGlyph, GhostButton, Panel, statusTone } from "@/components/site/primitives";
import { fmt, transactions, type Tx } from "@/lib/data";

const tabs = ["All", "Deposits", "Purchases", "Refunds"];
const icon = { Deposit: ArrowDownLeft, Purchase: ArrowUpRight, Refund: RotateCcw, Bonus: Gift };
const color = { Deposit: "#5ee6d0", Purchase: "#9d8cff", Refund: "#ff7aa8", Bonus: "#f7b267" };

export default function TransactionsPage() {
  const [tab, setTab] = useState(0);
  const filter = (t: Tx) => tab === 0 || (tab === 1 && t.type === "Deposit") || (tab === 2 && t.type === "Purchase") || (tab === 3 && (t.type === "Refund" || t.type === "Bonus"));
  const list = transactions.filter(filter);
  const totalIn = transactions.filter((t) => t.usd > 0 && t.status === "Completed").reduce((a, t) => a + t.usd, 0);
  const totalOut = transactions.filter((t) => t.usd < 0).reduce((a, t) => a - t.usd, 0);

  return (
    <>
      <PageHead
        eyebrow="Wallet"
        title={<>Transaction <span className="font-display font-normal italic text-aurora">history.</span></>}
        sub="Every deposit, purchase and refund on your balance."
        action={<GhostButton onClick={() => toast.success("CSV export ready", { description: "transactions_nov_2026.csv" })}><Download className="size-4" /> Export CSV</GhostButton>}
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { l: "Money in", v: totalIn, c: "text-mint" },
          { l: "Money out", v: totalOut, c: "" },
          { l: "Pending", v: 119.56, c: "text-amber" },
          { l: "Net · 30 days", v: totalIn - totalOut, c: "" },
        ].map((k) => (
          <Panel key={k.l} className="p-4 sm:p-5">
            <p className="text-[12.5px] text-muted-foreground">{k.l}</p>
            <LiveCounter value={k.v} decimals={2} prefix="$" className={`mt-2 text-[22px] font-semibold tracking-[-0.03em] sm:text-[26px] ${k.c}`} />
          </Panel>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <div className="-mx-5 overflow-x-auto px-5 scrollbar-none sm:mx-0 sm:px-0">
          <GooeyNav items={tabs} value={tab} onChange={setTab} size="sm" activeColor="#eceef3" activeLabelColor="#0b0a14" />
        </div>
        <span className="hidden text-[12.5px] text-muted-foreground sm:block">Nov 1 – Nov 22, 2026</span>
      </div>

      {/* desktop table */}
      <Panel className="mt-4 hidden overflow-hidden md:block">
        <table className="w-full text-left text-[13.5px]">
          <thead>
            <tr className="border-b border-white/[0.06] text-[11.5px] uppercase tracking-[0.12em] text-muted-foreground">
              <th className="px-6 py-4 font-medium">Transaction</th>
              <th className="px-4 py-4 font-medium">Asset</th>
              <th className="px-4 py-4 font-medium">Tx hash</th>
              <th className="px-4 py-4 font-medium">Date</th>
              <th className="px-4 py-4 font-medium">Status</th>
              <th className="px-6 py-4 text-right font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {list.map((t) => {
              const I = icon[t.type];
              return (
                <tr key={t.id} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02]">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="grid size-9 place-items-center rounded-full" style={{ background: `${color[t.type]}1a`, color: color[t.type] }}><I className="size-4" /></span>
                      <div>
                        <p className="font-medium">{t.label}</p>
                        <p className="font-mono text-[11.5px] text-muted-foreground">{t.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4"><span className="flex items-center gap-2"><CoinGlyph coin={t.asset} size={22} />{t.asset !== "USD" ? `${t.amount} ${t.asset}` : "Balance"}</span></td>
                  <td className="px-4">
                    {t.hash === "—" ? <span className="text-muted-foreground">—</span> : (
                      <button onClick={() => toast.success("Hash copied")} className="font-mono text-[12.5px] text-iris hover:underline">{t.hash}</button>
                    )}
                  </td>
                  <td className="px-4 text-muted-foreground">{t.date}</td>
                  <td className="px-4"><Badge tone={statusTone(t.status)} dot>{t.status}</Badge></td>
                  <td className={`px-6 text-right font-semibold tabular ${t.usd > 0 ? "text-mint" : ""}`}>{t.usd > 0 ? "+" : "−"}${fmt(Math.abs(t.usd))}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Panel>

      {/* mobile list */}
      <div className="mt-4 flex flex-col gap-2 md:hidden">
        {list.map((t) => {
          const I = icon[t.type];
          return (
            <Panel key={t.id} className="flex items-center gap-3 rounded-[18px] p-3.5">
              <span className="grid size-10 shrink-0 place-items-center rounded-full" style={{ background: `${color[t.type]}1a`, color: color[t.type] }}><I className="size-4" /></span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-medium">{t.label}</p>
                <p className="text-[11.5px] text-muted-foreground">{t.date} · {t.id}</p>
              </div>
              <div className="text-right">
                <p className={`text-[14px] font-semibold tabular ${t.usd > 0 ? "text-mint" : ""}`}>{t.usd > 0 ? "+" : "−"}${fmt(Math.abs(t.usd))}</p>
                <Badge tone={statusTone(t.status)} className="mt-1 h-5 text-[10px]">{t.status}</Badge>
              </div>
            </Panel>
          );
        })}
      </div>
    </>
  );
}
