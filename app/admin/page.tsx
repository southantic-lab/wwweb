"use client";

import Link from "next/link";
import { useState } from "react";
import { AlertTriangle, ArrowUpRight, Boxes, MessageSquareText, ShoppingCart, Users } from "lucide-react";
import ProximitySidebar from "@/components/ui/proximity-sidebar";
import GitHubActivity from "@/components/ui/github-activity";
import { GooeyNav } from "@/components/ui/gooey-nav";
import { LiveCounter } from "@/components/site/live-counter";
import { AreaChart, Avatar, Badge, CoinGlyph, Cover, Panel, PanelHeader, Sparkline, statusTone } from "@/components/site/primitives";
import { PageHead } from "@/components/site/account-shell";
import { codeBatches, contributions, customers, fmt, getProduct, orders, revenue } from "@/lib/data";

const sections = [
  { id: "overview", label: "Overview", kind: "title" as const },
  { id: "revenue", label: "Revenue", kind: "section" as const },
  { id: "orders", label: "Live orders", kind: "section" as const },
  { id: "stock", label: "Stock alerts", kind: "section" as const },
  { id: "chains", label: "Deposits by chain", kind: "section" as const },
  { id: "heatmap", label: "Sales heatmap", kind: "section" as const },
];

const ranges = ["24h", "7d", "30d", "90d"];
const heat = contributions(23, 182);

export default function AdminDashboard() {
  const [range, setRange] = useState(2);
  const scale = [0.08, 0.3, 1, 2.7][range];
  const data = revenue.map((v, i) => v * scale * (1 + Math.sin(i + range) * 0.06));

  return (
    <div className="flex gap-6">
      <div className="min-w-0 flex-1">
        <section id="overview" className="scroll-mt-28">
          <PageHead eyebrow="Operations" title={<>Store <span className="font-display font-normal italic text-aurora">pulse.</span></>} sub="Sunday, Nov 22 · all systems operational" />
          <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
            {[
              { l: "Revenue · 30d", v: 284310, p: "$", icon: ArrowUpRight, t: "+18.2%", c: "#5ee6d0", s: [4, 6, 5, 8, 7, 10, 12] },
              { l: "Orders", v: 12482, p: "", icon: ShoppingCart, t: "+9.4%", c: "#9d8cff", s: [5, 4, 6, 7, 6, 9, 10] },
              { l: "SMS delivered", v: 96210, p: "", icon: MessageSquareText, t: "98.7% success", c: "#7dd3fc", s: [3, 5, 6, 6, 8, 9, 11] },
              { l: "Active customers", v: 8317, p: "", icon: Users, t: "+412 this week", c: "#f7b267", s: [6, 6, 7, 7, 8, 8, 9] },
            ].map((k) => (
              <Panel key={k.l} className="p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <span className="text-[12.5px] text-muted-foreground">{k.l}</span>
                  <span className="grid size-7 place-items-center rounded-lg" style={{ background: `${k.c}1a`, color: k.c }}><k.icon className="size-3.5" /></span>
                </div>
                <LiveCounter value={k.v} prefix={k.p} className="mt-4 text-[24px] font-semibold tracking-[-0.04em] sm:text-[30px]" />
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[11.5px]" style={{ color: k.c }}>{k.t}</span>
                  <Sparkline data={k.s} color={k.c} className="h-7 w-16 sm:w-20" />
                </div>
              </Panel>
            ))}
          </div>
        </section>

        <section id="revenue" className="mt-4 scroll-mt-28">
          <Panel>
            <PanelHeader
              title="Revenue"
              hint="Net of refunds · USD"
              action={<GooeyNav items={ranges} value={range} onChange={setRange} size="xs" activeColor="#eceef3" activeLabelColor="#0b0a14" />}
            />
            <div className="px-5 pt-4 sm:px-6">
              <LiveCounter value={Math.round(data.reduce((a, b) => a + b, 0) * 98)} prefix="$" className="text-[34px] font-semibold tracking-[-0.045em]" />
            </div>
            <div className="px-2 pb-4 pt-2 sm:px-4">
              <AreaChart data={data} height={230} />
            </div>
            <div className="grid grid-cols-2 border-t border-white/[0.06] sm:grid-cols-4">
              {[
                { l: "Business Manager", v: 41, c: "#9d8cff" },
                { l: "SMS verification", v: 27, c: "#5ee6d0" },
                { l: "Profiles", v: 21, c: "#f7b267" },
                { l: "Pages", v: 11, c: "#ff7aa8" },
              ].map((x) => (
                <div key={x.l} className="border-white/[0.06] p-4 sm:border-r sm:p-5 sm:last:border-0">
                  <p className="flex items-center gap-2 text-[12px] text-muted-foreground"><span className="size-2 rounded-full" style={{ background: x.c }} /> {x.l}</p>
                  <p className="mt-1.5 text-[18px] font-semibold">{x.v}%</p>
                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.06]"><div className="h-full rounded-full" style={{ width: `${x.v * 2}%`, background: x.c }} /></div>
                </div>
              ))}
            </div>
          </Panel>
        </section>

        <div className="mt-4 grid gap-4 2xl:grid-cols-[1.3fr_1fr]">
          <section id="orders" className="scroll-mt-28">
            <Panel className="h-full">
              <PanelHeader title="Live orders" hint="Streaming from checkout" action={<Badge tone="mint" dot>Live</Badge>} />
              <div className="mt-3 flex flex-col px-3 pb-3">
                {orders.map((o) => {
                  const p = getProduct(o.slug)!;
                  const c = customers.find((x) => x.name === o.customer)!;
                  return (
                    <div key={o.id} className="flex items-center gap-3 rounded-2xl px-3 py-2.5 hover:bg-white/[0.025]">
                      <Avatar name={o.customer} hue={c.hue} size={34} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13.5px] font-medium">{o.customer}</p>
                        <p className="truncate text-[12px] text-muted-foreground">{p.name} · {p.edition}</p>
                      </div>
                      <CoinGlyph coin={o.coin} size={24} />
                      <span className="w-20 text-right text-[13.5px] font-semibold tabular">${fmt(o.total)}</span>
                      <Badge tone={statusTone(o.status)} className="hidden sm:inline-flex">{o.status}</Badge>
                      <span className="hidden w-14 text-right text-[11.5px] text-muted-foreground md:block">{o.time}</span>
                    </div>
                  );
                })}
              </div>
            </Panel>
          </section>

          <section id="stock" className="scroll-mt-28">
            <Panel className="h-full">
              <PanelHeader title="Stock alerts" hint="Below 15% of batch" action={<Link href="/admin/codes" className="text-[13px] text-iris">Inventory</Link>} />
              <div className="mt-3 flex flex-col gap-2 px-4 pb-4 sm:px-5">
                {codeBatches.map((b) => {
                  const p = getProduct(b.slug)!;
                  const pct = Math.round((b.available / b.total) * 100);
                  const low = pct < 35;
                  return (
                    <div key={b.id} className="flex items-center gap-3 rounded-2xl bg-white/[0.02] p-3 ring-1 ring-inset ring-white/[0.05]">
                      <Cover product={p} className="size-10 shrink-0 rounded-xl" />
                      <div className="min-w-0 flex-1">
                        <p className="flex items-center gap-1.5 truncate text-[13px] font-medium">{low && <AlertTriangle className="size-3.5 shrink-0 text-amber" />}{p.name} <span className="text-muted-foreground">· {p.edition.split("·")[0]}</span></p>
                        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: low ? "#f7b267" : "#5ee6d0" }} />
                        </div>
                      </div>
                      <span className="w-14 text-right text-[12.5px] tabular text-muted-foreground">{b.available}</span>
                    </div>
                  );
                })}
              </div>
            </Panel>
          </section>
        </div>

        <div className="mt-4 grid gap-4 2xl:grid-cols-[1fr_1.3fr]">
          <section id="chains" className="scroll-mt-28">
            <Panel className="h-full">
              <PanelHeader title="Deposits by chain" hint="Last 30 days" />
              <div className="mt-4 flex flex-col gap-4 px-5 pb-6 sm:px-6">
                {[
                  { c: "USDT", n: "TRC-20 · ERC-20 · BEP-20", v: 182400, pct: 64 },
                  { c: "BTC", n: "Bitcoin · Lightning", v: 61200, pct: 22 },
                  { c: "ETH", n: "Ethereum · Base · Arbitrum", v: 28900, pct: 10 },
                  { c: "SOL", n: "Solana", v: 11800, pct: 4 },
                ].map((x) => (
                  <div key={x.c} className="flex items-center gap-3">
                    <CoinGlyph coin={x.c} size={34} />
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between text-[13px]"><span className="font-medium">{x.c}</span><span className="tabular">${x.v.toLocaleString()}</span></div>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]"><div className="h-full rounded-full bg-aurora" style={{ width: `${x.pct}%` }} /></div>
                        <span className="w-9 text-right text-[11px] text-muted-foreground">{x.pct}%</span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">{x.n}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </section>
          <section id="heatmap" className="scroll-mt-28">
            <Panel className="h-full">
              <PanelHeader title="Sales heatmap" hint="Daily order volume" action={<Boxes className="size-4 text-muted-foreground" />} />
              <div className="overflow-x-auto px-5 pb-5 pt-4 scrollbar-none sm:px-6">
                <GitHubActivity
                  contributions={heat}
                  months={6}
                  cellSize={13}
                  accent={["#14161f", "#2b2f5a", "#4c4a9e", "#7c6cff", "#c9bfff"]}
                  label="Top categories:"
                  repos={[
                    { name: "Business Manager", count: 5120 },
                    { name: "SMS verification", count: 4210 },
                    { name: "Profiles", count: 2190 },
                    { name: "Pages", count: 962 },
                  ]}
                />
              </div>
            </Panel>
          </section>
        </div>
      </div>

      <aside className="hidden w-[150px] shrink-0 xl:block">
        <div className="sticky top-28 h-[360px]">
          <ProximitySidebar sections={sections} side="right" activeOffset={0.3} />
        </div>
      </aside>
    </div>
  );
}
