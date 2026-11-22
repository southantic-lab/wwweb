"use client";

import { useState } from "react";
import { Copy, KeyRound, ShieldAlert } from "lucide-react";
import PasswordInput from "@/components/ui/password-input";
import OtpInput from "@/components/ui/otp-input";
import DurationPicker from "@/components/ui/duration-picker";
import CodeBlock from "@/components/ui/code-block";
import FamilyDrawer from "@/components/ui/family-drawer";
import MatrixOrb from "@/components/ui/matrix-orb";
import { toast } from "@/components/ui/toast";
import { LiveCounter } from "@/components/site/live-counter";
import { PageHead } from "@/components/site/account-shell";
import { Badge, CoinGlyph, Panel, PanelHeader, PrimaryButton, statusTone } from "@/components/site/primitives";
import { fmt, wallets } from "@/lib/data";
import { cn } from "@/lib/utils";

const webhook = `{
  "event": "deposit.confirmed",
  "invoice": "INV-90412",
  "customer": "C-1042",
  "asset": "USDT",
  "network": "TRC-20",
  "amount": "500.00",
  "confirmations": 20,
  "credited_usd": 500.0,
  "tx": "0x8f3a…c21e"
}`;

export default function WalletSettings() {
  const [paused, setPaused] = useState<string[]>(["SOL"]);
  const [otp, setOtp] = useState("");
  const [otpStatus, setOtpStatus] = useState<"idle" | "success" | "error">("idle");
  const total = wallets.reduce((a, w) => a + w.usd, 0);

  return (
    <>
      <PageHead
        eyebrow="Treasury"
        title={<>Crypto <span className="font-display font-normal italic text-aurora">wallets.</span></>}
        sub="Receiving addresses, confirmation rules and payment processor credentials."
        action={
          <div className="rounded-2xl panel px-4 py-3">
            <p className="text-[11.5px] text-muted-foreground">Total held</p>
            <LiveCounter value={total} decimals={2} prefix="$" className="text-[22px] font-semibold tracking-[-0.03em]" />
          </div>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">
        {wallets.map((w) => {
          const off = paused.includes(w.coin);
          return (
            <Panel key={w.coin} className="relative overflow-hidden p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CoinGlyph coin={w.coin} size={38} />
                  <div>
                    <p className="text-[15px] font-semibold">{w.coin}</p>
                    <p className="text-[11.5px] text-muted-foreground">{w.network}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setPaused((p) => (off ? p.filter((x) => x !== w.coin) : [...p, w.coin]));
                    toast(off ? `${w.coin} deposits resumed` : `${w.coin} deposits paused`);
                  }}
                  className={cn("relative h-6 w-10 rounded-full transition-colors", off ? "bg-white/10" : "bg-mint")}
                >
                  <span className={cn("absolute top-0.5 size-5 rounded-full bg-white shadow transition-all", off ? "left-0.5" : "left-[18px]")} />
                </button>
              </div>
              <p className="mt-5 text-[24px] font-semibold tracking-[-0.03em]">{w.balance.toLocaleString()} <span className="text-[14px] text-muted-foreground">{w.coin}</span></p>
              <p className="text-[12.5px] text-muted-foreground">≈ ${fmt(w.usd)}</p>
              <button onClick={() => toast.success("Address copied")} className="mt-4 flex w-full items-center gap-2 rounded-xl bg-white/[0.03] px-3 py-2 text-left font-mono text-[11.5px] text-muted-foreground ring-1 ring-inset ring-white/[0.06] hover:text-foreground">
                <span className="truncate">{w.address}</span>
                <Copy className="size-3.5 shrink-0" />
              </button>
              <div className="mt-3 flex items-center justify-between text-[12px]">
                <Badge tone={off ? "amber" : statusTone("Active")} dot>{off ? "Paused" : "Receiving"}</Badge>
                <span className="text-muted-foreground">{w.confirmations} confirmations</span>
              </div>
            </Panel>
          );
        })}
      </div>

      <div className="mt-4 grid gap-4 2xl:grid-cols-2">
        <Panel>
          <PanelHeader title="Payment processor" hint="Credentials are encrypted and never shown again after saving" />
          <div className="flex flex-col gap-5 p-5 sm:p-6">
            <label className="flex flex-col gap-1.5">
              <span className="text-[12px] text-muted-foreground">Merchant ID</span>
              <input defaultValue="nocta-market-prod" className="h-11 rounded-xl bg-white/[0.03] px-3.5 font-mono text-[13.5px] outline-none ring-1 ring-inset ring-white/10 focus:ring-iris/60" />
            </label>
            <div className="flex flex-col gap-1.5">
              <span className="text-[12px] text-muted-foreground">API secret</span>
              <PasswordInput defaultValue="sk_live_9fQ2#xT7mK!" strength />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[12px] text-muted-foreground">Webhook signing secret</span>
              <PasswordInput defaultValue="whsec_short" strength />
            </div>
            <div className="rounded-2xl bg-white/[0.02] p-4 ring-1 ring-inset ring-white/[0.06]">
              <p className="text-[13px] font-medium">Invoice expiry</p>
              <p className="mb-3 mt-0.5 text-[12px] text-muted-foreground">Unpaid deposit invoices are closed after this time.</p>
              <DurationPicker defaultValue={{ hours: 0, minutes: 30 }} maxHours={24} onConfirm={(v) => toast.success(`Invoices expire after ${v.hours}h ${v.minutes}m`)} />
            </div>
          </div>
        </Panel>

        <div className="flex flex-col gap-4">
          <Panel>
            <PanelHeader title="Webhook" hint="POST https://api.nocta.demo/hooks/deposits" action={<Badge tone="mint" dot>200 OK · 41ms</Badge>} />
            <div className="p-5 sm:p-6">
              <CodeBlock code={webhook} language="json" accent="#5ee6d0" mode="dark" filename="deposit.confirmed.json" />
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="Node health" hint="Chain watchers polling every 4s" />
            <div className="flex items-center gap-5 p-5 sm:p-6">
              <MatrixOrb state="listening" size={100} color="#5ee6d0" labels={{ listening: "Online" }} />
              <div className="grid flex-1 grid-cols-2 gap-2 text-[12px]">
                {[["TRON", "Block 68,412,900"], ["Bitcoin", "Block 873,104"], ["Base", "Block 22,904,117"], ["Solana", "Slot 301,882,410"]].map(([n, b]) => (
                  <div key={n} className="rounded-xl bg-white/[0.03] p-2.5">
                    <p className="flex items-center gap-1.5 font-medium"><span className="size-1.5 rounded-full bg-mint" /> {n}</p>
                    <p className="mt-0.5 text-muted-foreground">{b}</p>
                  </div>
                ))}
              </div>
            </div>
          </Panel>
        </div>
      </div>

      <Panel className="mt-4">
        <div className="flex flex-col gap-6 p-5 sm:p-6 lg:flex-row lg:items-center">
          <div className="flex flex-1 items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-amber/15 text-amber"><ShieldAlert className="size-5" /></span>
            <div>
              <p className="text-[15px] font-semibold">Confirm changes with 2FA</p>
              <p className="mt-1 text-[13px] text-muted-foreground">Wallet and credential changes require an authenticator code. Demo: any code except 000000.</p>
            </div>
          </div>
          <OtpInput
            value={otp}
            onChange={(v) => { setOtp(v); setOtpStatus("idle"); }}
            onComplete={(v) => {
              if (v === "000000") return setOtpStatus("error");
              setOtpStatus("success");
              toast.success("Wallet settings saved");
            }}
            status={otpStatus}
            size="sm"
          />
          <div className="flex gap-2">
            <FamilyDrawer
              trigger={<span className="inline-flex items-center gap-2"><KeyRound className="size-4" /> Wallet security</span>}
              triggerClassName="inline-flex h-11 items-center rounded-full bg-white/[0.04] px-5 text-[14px] font-medium text-foreground ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/[0.07]"
            />
            <PrimaryButton onClick={() => (otp.length === 6 ? toast.success("Saved") : toast.warning("Enter your 2FA code first"))}>Save</PrimaryButton>
          </div>
        </div>
      </Panel>
    </>
  );
}
