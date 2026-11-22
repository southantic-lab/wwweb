"use client";

import { useEffect, useState } from "react";
import { Copy, RotateCw, Search, Timer } from "lucide-react";
import MatrixOrb from "@/components/ui/matrix-orb";
import OtpInput from "@/components/ui/otp-input";
import StepPlayer from "@/components/ui/step-player";
import AnimatedCounter from "@/components/ui/animated-counter";
import DeleteButton from "@/components/ui/delete-button";
import { GooeyNav } from "@/components/ui/gooey-nav";
import { toast } from "@/components/ui/toast";
import { Badge, Panel, PanelHeader, PrimaryButton, statusTone } from "./primitives";
import { fmt, smsCountries, smsServices } from "@/lib/data";
import { cn } from "@/lib/utils";

type Phase = "idle" | "waiting" | "received";

const history = [
  { service: "WhatsApp", number: "+1 (415) 555-0148", code: "482913", price: 0.59, status: "Completed", time: "09:12" },
  { service: "Telegram", number: "+44 7700 900412", code: "739204", price: 0.66, status: "Completed", time: "Yesterday" },
  { service: "Google", number: "+90 532 555 01 77", code: "—", price: 0.22, status: "Refunded", time: "Yesterday" },
  { service: "Discord", number: "+49 1512 5550 334", code: "105588", price: 0.25, status: "Completed", time: "Nov 19" },
];

export function SmsConsole() {
  const [mode, setMode] = useState(0);
  const [country, setCountry] = useState(0);
  const [service, setService] = useState(0);
  const [q, setQ] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [left, setLeft] = useState(1200);
  const [code, setCode] = useState("");

  const c = smsCountries[country];
  const s = smsServices[service];
  const price = Math.round(s.price * c.mult * (mode === 0 ? 1 : mode === 1 ? 2.4 : 14) * 100) / 100;

  useEffect(() => {
    if (phase !== "waiting") return;
    const tick = setInterval(() => setLeft((l) => Math.max(0, l - 1)), 1000);
    const arrive = setTimeout(() => {
      setPhase("received");
      let k = 0;
      const full = "482913";
      const type = setInterval(() => {
        k++;
        setCode(full.slice(0, k));
        if (k >= 6) {
          clearInterval(type);
          toast.success(`${s.name} code received`, { description: `${full.slice(0, 3)} ${full.slice(3)} · ${c.dial} number` });
        }
      }, 110);
    }, 4200);
    return () => {
      clearInterval(tick);
      clearTimeout(arrive);
    };
  }, [phase, s.name, c.dial]);

  const start = () => {
    setCode("");
    setLeft(1200);
    setPhase("waiting");
  };

  const services = smsServices.map((x, i) => ({ ...x, i })).filter((x) => x.name.toLowerCase().includes(q.toLowerCase()));
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");

  return (
    <div className="mx-auto max-w-[1320px] px-5 pt-4 lg:px-8 lg:pt-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-iris">SMS verification</p>
          <h1 className="mt-2 text-[34px] font-semibold leading-none tracking-[-0.045em] sm:text-[52px]">
            Get a number. <span className="font-display font-normal italic text-aurora">Get the code.</span>
          </h1>
          <p className="mt-3 max-w-xl text-[15px] text-muted-foreground">Numbers in 35 countries for 600+ services. You only pay when an SMS arrives — otherwise it&apos;s refunded automatically.</p>
        </div>
        <div className="-mx-5 overflow-x-auto px-5 scrollbar-none sm:mx-0 sm:px-0">
          <GooeyNav items={["Single SMS", "Multi · 1h", "Rent · 7d"]} value={mode} onChange={setMode} size="sm" activeColor="#9d8cff" activeLabelColor="#0b0a14" />
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr_1.25fr]">
        <Panel>
          <PanelHeader title="1 · Country" hint={`${smsCountries.length} popular · 35 total`} />
          <div className="grid grid-cols-2 gap-2 p-4 sm:p-5 lg:grid-cols-1">
            {smsCountries.map((x, i) => (
              <button
                key={x.name}
                onClick={() => setCountry(i)}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left ring-1 ring-inset transition-colors",
                  country === i ? "bg-iris/10 ring-iris/40" : "bg-white/[0.02] ring-white/[0.06] hover:bg-white/[0.05]",
                )}
              >
                <span className="text-[20px] leading-none">{x.flag}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13.5px] font-medium">{x.name}</span>
                  <span className="text-[11.5px] text-muted-foreground">{x.dial}</span>
                </span>
              </button>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelHeader title="2 · Service" hint="Price per received SMS" />
          <div className="p-4 sm:p-5">
            <label className="flex h-10 items-center gap-2 rounded-xl bg-white/[0.03] px-3 ring-1 ring-inset ring-white/[0.08]">
              <Search className="size-4 text-muted-foreground" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search services" className="w-full bg-transparent text-[13.5px] outline-none placeholder:text-muted-foreground" />
            </label>
            <div className="mt-3 flex flex-col gap-1">
              {services.map((x) => (
                <button
                  key={x.name}
                  onClick={() => setService(x.i)}
                  className={cn("flex items-center justify-between rounded-xl px-3 py-2.5 text-left transition-colors", service === x.i ? "bg-white/[0.07]" : "hover:bg-white/[0.035]")}
                >
                  <span className="flex items-center gap-3">
                    <span className={cn("grid size-5 place-items-center rounded-full ring-1 ring-inset", service === x.i ? "bg-iris ring-iris" : "ring-white/20")}>
                      {service === x.i && <span className="size-1.5 rounded-full bg-[#0b0a14]" />}
                    </span>
                    <span className="text-[13.5px] font-medium">{x.name}</span>
                  </span>
                  <span className="text-right">
                    <span className="block text-[13px] font-semibold tabular">${fmt(x.price * c.mult)}</span>
                    <span className="text-[11px] text-muted-foreground">{x.stock.toLocaleString()} nums</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </Panel>

        <Panel className="relative overflow-hidden">
          <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-iris/15 blur-3xl" />
          <PanelHeader title="3 · Receive" hint={`${c.flag} ${c.name} · ${s.name}`} action={<Badge tone={phase === "received" ? "mint" : phase === "waiting" ? "amber" : "neutral"} dot>{phase === "received" ? "Code received" : phase === "waiting" ? "Listening" : "Ready"}</Badge>} />
          <div className="relative flex flex-col items-center gap-5 p-5 sm:p-6">
            <MatrixOrb state={phase === "waiting" ? "listening" : phase === "received" ? "thinking" : "idle"} size={150} color={phase === "received" ? "#5ee6d0" : "#9d8cff"} labels={{ idle: "Ready", listening: "Waiting for SMS", thinking: "Code received" }} />
            <div className="text-center">
              <p className="text-[12px] text-muted-foreground">{phase === "idle" ? "Your number will appear here" : "Your number"}</p>
              <button
                disabled={phase === "idle"}
                onClick={() => toast.success("Number copied")}
                className="mt-1 inline-flex items-center gap-2 font-mono text-[22px] tracking-wide text-foreground disabled:text-foreground/30"
              >
                {c.dial} {phase === "idle" ? "••• ••• ••••" : "415 555 0148"}
                {phase !== "idle" && <Copy className="size-4 text-muted-foreground" />}
              </button>
            </div>
            <OtpInput value={code} length={6} type="numbers" size="md" status={code.length === 6 ? "success" : "idle"} disabled={phase === "idle"} onChange={setCode} />
            <div className="w-full">
              <StepPlayer
                key={phase}
                steps={[{ label: "Number", duration: 1 }, { label: "Waiting", duration: 3.2 }, { label: "Received", duration: 1 }]}
                value={phase === "idle" ? 0 : phase === "waiting" ? 1 : 2}
                playing={phase === "waiting"}
                showControl={false}
                className="w-full"
              />
              <div className="mt-2 flex justify-between text-[11.5px] text-muted-foreground">
                <span>Number issued</span>
                <span className="flex items-center gap-1"><Timer className="size-3" /> {phase === "idle" ? "20:00" : `${mm}:${ss}`}</span>
                <span>Code received</span>
              </div>
            </div>
            <div className="flex w-full items-center justify-between gap-3 border-t border-white/[0.06] pt-5">
              <div>
                <p className="text-[11.5px] text-muted-foreground">Total</p>
                <AnimatedCounter value={price} decimals={2} prefix="$" className="text-[26px] font-semibold tracking-[-0.03em]" />
              </div>
              {phase === "idle" ? (
                <PrimaryButton onClick={start}>Get number</PrimaryButton>
              ) : phase === "waiting" ? (
                <DeleteButton
                  onConfirm={() => {
                    setPhase("idle");
                    toast.info("Number cancelled", { description: `$${fmt(price)} returned to your balance` });
                  }}
                />
              ) : (
                <PrimaryButton onClick={start}><RotateCw className="size-4" /> Another code</PrimaryButton>
              )}
            </div>
          </div>
        </Panel>
      </div>

      <Panel className="mt-4">
        <PanelHeader title="Recent activations" hint="Last 7 days" />
        <div className="mt-3 divide-y divide-white/[0.05] px-2 pb-2 sm:px-3">
          {history.map((h) => (
            <div key={h.number + h.time} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 px-3 py-3 sm:grid-cols-[140px_1fr_120px_90px_110px]">
              <span className="text-[13.5px] font-medium">{h.service}</span>
              <span className="text-right font-mono text-[13px] text-muted-foreground sm:text-left">{h.number}</span>
              <span className="font-mono text-[14px] tracking-[0.2em] text-foreground">{h.code}</span>
              <span className="text-right text-[13px] tabular sm:text-left">${fmt(h.price)}</span>
              <span className="hidden justify-self-end sm:block"><Badge tone={statusTone(h.status)}>{h.status}</Badge></span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
