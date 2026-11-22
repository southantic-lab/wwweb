"use client";

import { useEffect, useRef, useState } from "react";
import PromptBox from "@/components/ui/prompt-box";
import AiStatus from "@/components/ui/ai-status";
import StreamingResponse from "@/components/ui/streaming-response";
import MatrixOrb from "@/components/ui/matrix-orb";
import { toast } from "@/components/ui/toast";

const ANSWER = `For running **3 ad accounts under $100**, the best fit right now is **Business Manager — Verified · 5 ad accounts** at **$89** (−31%).

- Admin access, 2FA secret and 8 backup codes delivered instantly
- Pay with **USDT on TRC-20** for the lowest network fee
- Add a **US SMS number** ($0.45) to confirm the login from a new device

Replacement guarantee covers the first **72 hours** after delivery.`;

type Phase = "idle" | "thinking" | "researching" | "writing" | "done";

export function Concierge() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [run, setRun] = useState(0);
  const [question, setQuestion] = useState("I need a BM for 3 ad accounts, budget under $100");
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  const ask = (q?: string) => {
    if (q) setQuestion(q);
    setRun((r) => r + 1);
    setPhase("thinking");
  };

  useEffect(() => {
    if (phase === "thinking") {
      const t = setTimeout(() => setPhase("researching"), 1100);
      return () => clearTimeout(t);
    }
    if (phase === "researching") {
      const t = setTimeout(() => setPhase("writing"), 1300);
      return () => clearTimeout(t);
    }
    if (phase === "writing") {
      const t = setTimeout(() => setPhase("done"), 5200);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        ask();
      }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const orbState = phase === "idle" || phase === "done" ? "idle" : phase === "writing" ? "listening" : "thinking";

  return (
    <div ref={ref} className="grid gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
      <div className="flex flex-col justify-between gap-8 rounded-[28px] panel p-6 sm:p-8">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-iris">Nocta Concierge</p>
          <h3 className="mt-4 text-[28px] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-[36px]">
            Describe what you need.
            <br />
            <span className="font-display italic font-normal text-aurora">We&apos;ll find the right account.</span>
          </h3>
          <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-muted-foreground">
            Compares limits, account age, geo and live stock across 5,700 listings — then tells you the cheapest way to pay.
          </p>
        </div>
        <div className="flex items-center gap-5">
          <MatrixOrb state={orbState} size={120} color="#9d8cff" />
          <div className="flex flex-col gap-2">
            {["Cheapest UK number for SMS", "Aged profile with 2FA", "Page with 10K followers"].map((s) => (
              <button
                key={s}
                onClick={() => ask(s)}
                className="w-fit rounded-full bg-white/[0.04] px-3.5 py-1.5 text-left text-[12.5px] text-foreground/80 ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/[0.08] hover:text-foreground"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex min-h-[460px] flex-col gap-4 rounded-[28px] bg-[#0a0b10] p-4 ring-1 ring-inset ring-white/[0.06] sm:p-6">
        <div className="ml-auto max-w-[85%] rounded-[20px] rounded-br-md bg-[#1b1d29] px-4 py-2.5 text-[14px] text-foreground">{question}</div>
        <div className="flex-1 space-y-3 px-1">
          {phase !== "idle" && (
            <AiStatus
              state={phase === "done" ? "done" : phase}
              detail={phase === "researching" ? "Comparing 38 BM listings" : undefined}
              timer
              className="text-foreground"
            />
          )}
          {(phase === "writing" || phase === "done") && (
            <StreamingResponse
              key={run}
              text={ANSWER}
              status={phase === "writing" ? "streaming" : "done"}
              ink="#eceef3"
              onCopy={() => toast.success("Answer copied")}
              onRetry={() => ask()}
              className="text-[14.5px] leading-relaxed text-foreground/90"
            />
          )}
        </div>
        <PromptBox
          className="w-full"
          placeholder={["Ask for a product, budget or device…", "e.g. Profile pack with email access", "e.g. Turkish number for WhatsApp"]}
          status={phase === "thinking" || phase === "researching" || phase === "writing" ? "streaming" : "idle"}
          onStop={() => setPhase("done")}
          onSubmit={(p) => ask(p)}
          efforts={[
            { id: "quick", label: "Quick", color: "#5ee6d0" },
            { id: "compare", label: "Compare", color: "#9d8cff" },
            { id: "deep", label: "Deep dive", color: "#ff7aa8" },
          ]}
        />
      </div>
    </div>
  );
}
