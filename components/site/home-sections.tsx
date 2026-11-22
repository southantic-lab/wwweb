"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Briefcase, Flag, MessageSquareText, UserRound, Repeat, Lock, RefreshCcw } from "lucide-react";
import { GooeyNav } from "@/components/ui/gooey-nav";
import OtpInput from "@/components/ui/otp-input";
import StepPlayer from "@/components/ui/step-player";
import Faq from "@/components/ui/faq";
import { ProductCard } from "./product-card";
import { CoinGlyph, Logo, SectionTitle } from "./primitives";
import { categories, products } from "@/lib/data";

const filters = ["All", "SMS verification", "Business Manager", "Profiles", "Pages"];

export function Trending() {
  const [f, setF] = useState(0);
  const list = products.filter((p) => f === 0 || p.category === filters[f]).slice(0, 8);
  return (
    <section className="mx-auto w-full max-w-[1320px] px-5 lg:px-8">
      <SectionTitle
        eyebrow="Trending this week"
        title={<>Most wanted, <span className="font-display font-normal italic text-aurora">right now.</span></>}
        action={
          <div className="-mx-5 overflow-x-auto px-5 scrollbar-none sm:mx-0 sm:px-0">
            <GooeyNav items={filters} value={f} onChange={setF} size="sm" activeColor="#9d8cff" activeLabelColor="#0b0a14" />
          </div>
        }
      />
      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {list.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  );
}

const catIcon = { "SMS verification": MessageSquareText, "Business Manager": Briefcase, Profiles: UserRound, Pages: Flag } as const;

export function CategoryStrip() {
  return (
    <section className="mx-auto w-full max-w-[1320px] px-5 lg:px-8">
      <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2 scrollbar-none lg:mx-0 lg:grid lg:grid-cols-4 lg:px-0">
        {categories.map((c) => {
          const Icon = catIcon[c.name];
          return (
            <Link
              key={c.name}
              href={c.name === "SMS verification" ? "/sms" : "/products"}
              className="group flex min-w-[170px] flex-col gap-8 rounded-[20px] panel p-4 transition-colors hover:bg-white/[0.03]"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-white/[0.04] text-foreground/80 ring-1 ring-inset ring-white/[0.08] transition-colors group-hover:text-iris">
                <Icon className="size-[18px]" />
              </span>
              <span>
                <span className="block text-[14px] font-medium text-foreground">{c.name}</span>
                <span className="text-[12px] text-muted-foreground">{c.name === "SMS verification" ? `${c.count} countries & services` : `${c.count.toLocaleString()} in stock`}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

const CODES = ["482913", "739204", "105588", "664271"];

function RollingCode() {
  const [i, setI] = useState(0);
  const [v, setV] = useState("");
  useEffect(() => {
    const code = CODES[i % CODES.length];
    let k = 0;
    const type = setInterval(() => {
      k++;
      setV(code.slice(0, k));
      if (k >= code.length) clearInterval(type);
    }, 160);
    const next = setTimeout(() => setI((n) => n + 1), 3600);
    return () => {
      clearInterval(type);
      clearTimeout(next);
    };
  }, [i]);
  return <OtpInput value={v} length={6} type="numbers" size="md" status={v.length === 6 ? "success" : "idle"} onChange={setV} />;
}

export function Bento() {
  return (
    <section className="mx-auto w-full max-w-[1320px] px-5 lg:px-8">
      <SectionTitle
        eyebrow="Why Nocta"
        title={<>Built for the <span className="font-display font-normal italic text-aurora">instant</span> economy.</>}
        sub="From deposit to delivery, every step is automated, verified and reversible if something goes wrong."
      />
      <div className="mt-10 grid gap-4 lg:grid-cols-6 lg:grid-rows-[auto_auto]">
        <div className="relative overflow-hidden rounded-[26px] panel p-6 sm:p-8 lg:col-span-3">
          <p className="text-[13px] font-medium text-mint">SMS verification</p>
          <h3 className="mt-2 text-[24px] font-semibold tracking-[-0.03em]">Codes arrive in seconds.</h3>
          <p className="mt-2 max-w-sm text-[14px] text-muted-foreground">Pick a country and service, get a fresh number, and watch the code land. No SMS in 20 minutes means an automatic refund.</p>
          <div className="mt-8 flex justify-center rounded-2xl bg-[#0a0b10] py-8 ring-1 ring-inset ring-white/[0.05]">
            <RollingCode />
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[26px] panel p-6 sm:p-8 lg:col-span-3">
          <p className="text-[13px] font-medium text-iris">Crypto native</p>
          <h3 className="mt-2 text-[24px] font-semibold tracking-[-0.03em]">Top up once. Spend in one tap.</h3>
          <p className="mt-2 max-w-sm text-[14px] text-muted-foreground">Deposit USDT, BTC, ETH or SOL. Your USD balance is credited after network confirmation.</p>
          <div className="mt-8 rounded-2xl bg-[#0a0b10] p-5 ring-1 ring-inset ring-white/[0.05]">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CoinGlyph coin="USDT" size={36} />
                <div>
                  <p className="text-[14px] font-medium">500.00 USDT</p>
                  <p className="text-[12px] text-muted-foreground">TRC-20 · ≈ $500.00</p>
                </div>
              </div>
              <span className="text-[12px] text-muted-foreground">Live demo</span>
            </div>
            <StepPlayer
              steps={[{ label: "Sent", duration: 1.2 }, { label: "Detected", duration: 1.6 }, { label: "Confirming", duration: 2.4 }, { label: "Credited", duration: 1 }]}
              defaultPlaying
              loop
              className="w-full"
            />
            <div className="mt-3 grid grid-cols-4 text-center text-[11.5px] text-muted-foreground">
              <span>Sent</span><span>Detected</span><span>Confirming</span><span>Credited</span>
            </div>
          </div>
        </div>

        {[
          { icon: Lock, t: "Checked before listing", d: "Every account is logged in and validated by our team before it goes on sale.", c: "#9d8cff" },
          { icon: RefreshCcw, t: "72h replacement", d: "Login doesn't work? We replace it or refund your balance within minutes.", c: "#5ee6d0" },
          { icon: Repeat, t: "Geo-matched", d: "Filter by country so accounts and numbers match your target market.", c: "#f7b267" },
        ].map((x) => (
          <div key={x.t} className="rounded-[26px] panel p-6 lg:col-span-2">
            <span className="grid size-10 place-items-center rounded-xl" style={{ background: `${x.c}1a`, color: x.c }}>
              <x.icon className="size-[18px]" />
            </span>
            <h4 className="mt-5 text-[16px] font-semibold tracking-[-0.02em]">{x.t}</h4>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">{x.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const faqs = [
  { id: "delivery", question: "How fast is delivery?", answer: "Instantly for most listings. Login details appear in your library the moment you pay; pages are handed over by admin invite within 15 minutes." },
  { id: "crypto", question: "Which cryptocurrencies can I deposit?", answer: "USDT (TRC-20, ERC-20, BEP-20), BTC (on-chain and Lightning), ETH (Ethereum, Arbitrum, Base) and SOL. Your balance is held in USD." },
  { id: "refund", question: "What if an account doesn't work?", answer: "Open a ticket from the order page. Verified issues are replaced or refunded to your balance — usually within 10 minutes." },
  { id: "region", question: "What happens if no SMS arrives?", answer: "Numbers stay active for 20 minutes. If no code arrives, the number is cancelled and the amount returns to your balance automatically." },
];

export function HomeFaq() {
  return (
    <section className="mx-auto grid w-full max-w-[1320px] gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
      <SectionTitle eyebrow="Questions" title={<>Answers, <span className="font-display font-normal italic text-aurora">in the thread.</span></>} sub="Still curious? Our support replies in under 4 minutes, 24/7." />
      <div className="rounded-[26px] panel p-4 sm:p-6">
        <Faq items={faqs} defaultValue="delivery" accent="#9d8cff" avatar={<Logo compact />} />
      </div>
    </section>
  );
}

export function CtaLink() {
  return (
    <Link href="/products" className="inline-flex items-center gap-2 text-[14px] font-medium text-foreground">
      Browse all <ArrowRight className="size-4" />
    </Link>
  );
}
