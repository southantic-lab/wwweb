"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Copy, Radio } from "lucide-react";
import { GooeyNav } from "@/components/ui/gooey-nav";
import AnimatedCounter from "@/components/ui/animated-counter";
import MatrixOrb from "@/components/ui/matrix-orb";
import StepPlayer from "@/components/ui/step-player";
import { toast } from "@/components/ui/toast";
import { PageHead } from "@/components/site/account-shell";
import { Badge, CoinGlyph, FakeQr, Panel, PanelHeader, PrimaryButton, statusTone } from "@/components/site/primitives";
import { coins, fmt, transactions, user } from "@/lib/data";
import { cn } from "@/lib/utils";

const addresses: Record<string, string> = {
  USDT: "TQ7mN3k8vPz2xR4hW9cLb6Yt1sD5fG8jKa",
  BTC: "bc1qx7m3k8vpz2xr4hw9clb6yt1sd5fg8jka0q9rt",
  ETH: "0x7A3f9C21bE40D8a1F5c6E92bB0dA4e71C9f2E810",
  SOL: "5Hq1vXeN8zK2pRt7WmL4cB9dJ3fA6gS0uY1oQ8iMnZ",
};

export default function DepositPage() {
  const [ci, setCi] = useState(0);
  const [ni, setNi] = useState(0);
  const [amount, setAmount] = useState(250);
  const [stage, setStage] = useState(0); // 0 waiting, 1 detected, 2 confirming, 3 credited
  const [balance, setBalance] = useState(user.balance);
  const coin = coins[ci];
  const usd = amount * (ci === 0 ? 1 : 1);
  const cryptoAmt = amount / coin.rate;

  useEffect(() => {
    if (stage === 0 || stage === 3) return;
    const t = setTimeout(() => {
      const next = stage + 1;
      setStage(next);
      if (next === 3) {
        setBalance((b) => b + usd);
        toast.success("Deposit credited", { description: `+$${fmt(usd)} added to your balance` });
      }
    }, stage === 1 ? 1600 : 2800);
    return () => clearTimeout(t);
  }, [stage, usd]);

  const addr = addresses[coin.id];

  return (
    <>
      <PageHead
        eyebrow="Wallet"
        title={<>Top up with <span className="font-display font-normal italic text-aurora">crypto.</span></>}
        sub="Funds are converted to USD at the moment of confirmation. No fees from Nocta."
        action={
          <div className="rounded-2xl panel px-4 py-3">
            <p className="text-[11.5px] text-muted-foreground">Current balance</p>
            <AnimatedCounter value={balance} decimals={2} prefix="$" className="text-[22px] font-semibold tracking-[-0.03em]" />
          </div>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[1fr_1.05fr]">
        <Panel>
          <PanelHeader title="1 · Choose asset" />
          <div className="grid grid-cols-2 gap-2 p-5 sm:grid-cols-4 sm:p-6">
            {coins.map((c, i) => (
              <button
                key={c.id}
                onClick={() => { setCi(i); setNi(0); setStage(0); }}
                className={cn(
                  "flex flex-col items-start gap-3 rounded-2xl p-3.5 text-left ring-1 ring-inset transition-all",
                  ci === i ? "bg-white/[0.06] ring-white/25" : "bg-white/[0.02] ring-white/[0.06] hover:bg-white/[0.04]",
                )}
                style={ci === i ? { boxShadow: `0 0 0 1px ${c.color}55, 0 12px 30px -16px ${c.color}` } : undefined}
              >
                <CoinGlyph coin={c.id} size={34} />
                <span>
                  <span className="block text-[14px] font-semibold">{c.id}</span>
                  <span className="text-[11.5px] text-muted-foreground">{c.name}</span>
                </span>
              </button>
            ))}
          </div>

          <div className="border-t border-white/[0.06] px-5 py-5 sm:px-6">
            <p className="mb-3 text-[13px] font-medium">2 · Network</p>
            <div className="-mx-1 overflow-x-auto px-1 scrollbar-none">
              <GooeyNav items={[...coin.networks]} value={ni} onChange={setNi} size="sm" activeColor={coin.color} activeLabelColor="#0b0a14" />
            </div>
            <p className="mt-3 flex items-center gap-2 text-[12px] text-amber">
              <AlertTriangle className="size-3.5" /> Only send {coin.id} on {coin.networks[ni]}. Other networks will be lost.
            </p>
          </div>

          <div className="border-t border-white/[0.06] px-5 py-5 sm:px-6">
            <p className="mb-3 text-[13px] font-medium">3 · Amount (USD)</p>
            <div className="flex items-center gap-3 rounded-2xl bg-[#0a0b10] px-4 py-3 ring-1 ring-inset ring-white/[0.07]">
              <span className="text-[26px] font-semibold text-muted-foreground">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                className="w-full bg-transparent text-[30px] font-semibold tracking-[-0.03em] outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="shrink-0 text-right text-[12px] text-muted-foreground">
                ≈ <AnimatedCounter value={cryptoAmt} decimals={coin.id === "BTC" ? 6 : coin.id === "USDT" ? 2 : 4} className="font-medium text-foreground" /> {coin.id}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {[50, 100, 250, 500, 1000].map((v) => (
                <button key={v} onClick={() => setAmount(v)} className={cn("h-8 rounded-full px-3.5 text-[12.5px] ring-1 ring-inset", amount === v ? "bg-[#eceef3] text-[#0b0a14] ring-transparent" : "bg-white/[0.03] ring-white/10 hover:bg-white/[0.06]")}>
                  ${v}
                </button>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 text-[12px]">
              <div className="rounded-xl bg-white/[0.03] p-3"><p className="text-muted-foreground">Rate</p><p className="mt-1 font-medium">1 {coin.id} = ${fmt(coin.rate)}</p></div>
              <div className="rounded-xl bg-white/[0.03] p-3"><p className="text-muted-foreground">Confirmations</p><p className="mt-1 font-medium">{coin.conf} blocks</p></div>
              <div className="rounded-xl bg-white/[0.03] p-3"><p className="text-muted-foreground">Minimum</p><p className="mt-1 font-medium">{coin.min} {coin.id}</p></div>
            </div>
          </div>
        </Panel>

        <Panel className="relative overflow-hidden">
          <div className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full blur-[90px]" style={{ background: `${coin.color}33` }} />
          <PanelHeader title="4 · Send to this address" hint={`${coin.name} · ${coin.networks[ni]}`} action={<Badge tone={stage === 3 ? "mint" : stage === 0 ? "neutral" : "amber"} dot>{["Awaiting", "Detected", "Confirming", "Credited"][stage]}</Badge>} />
          <div className="relative grid gap-6 p-5 sm:grid-cols-[180px_1fr] sm:p-6">
            <div className="mx-auto w-[180px]">
              <FakeQr seed={ci * 7 + ni + 3} className="w-full p-2" />
            </div>
            <div className="flex min-w-0 flex-col gap-4">
              <div>
                <p className="text-[12px] text-muted-foreground">Deposit address</p>
                <p className="mt-1 break-all font-mono text-[13.5px] leading-relaxed text-foreground">{addr}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => toast.success("Address copied", { description: `${coin.id} · ${coin.networks[ni]}` })} className="inline-flex h-9 items-center gap-2 rounded-full bg-white/[0.06] px-3.5 text-[12.5px] ring-1 ring-inset ring-white/10 hover:bg-white/10">
                  <Copy className="size-3.5" /> Copy address
                </button>
                <button onClick={() => toast.info("Expected amount copied")} className="inline-flex h-9 items-center gap-2 rounded-full bg-white/[0.03] px-3.5 text-[12.5px] ring-1 ring-inset ring-white/10 hover:bg-white/[0.06]">
                  Copy amount
                </button>
              </div>
              <div className="rounded-2xl bg-white/[0.03] p-3.5 text-[12.5px] text-muted-foreground">
                Send exactly <span className="font-semibold text-foreground">{fmt(cryptoAmt, coin.id === "BTC" ? 6 : 4)} {coin.id}</span>. Invoice expires in <span className="text-foreground">29:41</span>.
              </div>
            </div>
          </div>

          <div className="relative mx-5 mb-5 rounded-[22px] bg-[#0a0b10] p-5 ring-1 ring-inset ring-white/[0.06] sm:mx-6 sm:mb-6">
            <div className="flex items-center gap-5">
              <MatrixOrb state={stage === 0 ? "listening" : stage === 3 ? "idle" : "thinking"} size={96} color={stage === 3 ? "#5ee6d0" : coin.color} labels={{ listening: "Watching chain", thinking: "Confirming", idle: "Credited" }} />
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 text-[14px] font-medium"><Radio className="size-4 text-mint" /> Live chain watcher</p>
                <p className="mt-1 text-[12.5px] text-muted-foreground">
                  {stage === 0 && "Listening for incoming transactions to this address…"}
                  {stage === 1 && "Transaction found in mempool · 0x8f3a…c21e"}
                  {stage === 2 && `Waiting for ${coin.conf} confirmations…`}
                  {stage === 3 && `+$${fmt(usd)} credited to your balance.`}
                </p>
              </div>
            </div>
            <div className="mt-5">
              <StepPlayer
                key={stage === 0 ? "w" : "r"}
                steps={[{ label: "Awaiting", duration: 1 }, { label: "Detected", duration: 1.6 }, { label: "Confirming", duration: 2.8 }, { label: "Credited", duration: 1 }]}
                value={stage}
                playing={stage > 0 && stage < 3}
                showControl={false}
                className="w-full"
              />
              <div className="mt-2 grid grid-cols-4 text-center text-[11px] text-muted-foreground">
                <span>Awaiting</span><span>Detected</span><span>Confirming</span><span>Credited</span>
              </div>
            </div>
            <PrimaryButton className="mt-5 w-full" onClick={() => setStage(stage === 3 ? 0 : 1)}>
              {stage === 3 ? "New deposit" : stage === 0 ? "Simulate incoming transaction" : "Confirming…"}
            </PrimaryButton>
          </div>
        </Panel>
      </div>

      <Panel className="mt-4">
        <PanelHeader title="Recent deposits" />
        <div className="mt-3 divide-y divide-white/[0.05] px-3 pb-3">
          {transactions.filter((t) => t.type === "Deposit").map((t) => (
            <div key={t.id} className="flex items-center gap-3 px-2 py-3">
              <CoinGlyph coin={t.asset} size={34} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-medium">{t.amount} {t.asset}</p>
                <p className="truncate text-[12px] text-muted-foreground">{t.label} · {t.date}</p>
              </div>
              <span className="hidden font-mono text-[12px] text-muted-foreground sm:block">{t.hash}</span>
              <span className="w-24 text-right text-[14px] font-semibold tabular">${fmt(t.usd)}</span>
              <Badge tone={statusTone(t.status)}>{t.status}</Badge>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
