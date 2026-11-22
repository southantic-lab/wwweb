"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BadgeCheck, ChevronRight, Globe2, Minus, MonitorSmartphone, Plus, RefreshCcw, ShieldCheck, Wallet, Zap } from "lucide-react";
import GridReveal from "@/components/ui/grid-reveal";
import RailToc from "@/components/ui/rail-toc";
import ScrollProgress from "@/components/ui/scroll-progress";
import StepPlayer from "@/components/ui/step-player";
import EmojiReaction from "@/components/ui/emoji-reaction";
import Faq from "@/components/ui/faq";
import { GooeyNav } from "@/components/ui/gooey-nav";
import AnimatedCounter from "@/components/ui/animated-counter";
import { toast } from "@/components/ui/toast";
import { ProductCard } from "./product-card";
import { Avatar, Badge, Logo, PrimaryButton, Stars } from "./primitives";
import { coverUrl } from "@/lib/cover";
import { fmt, products, user, type Product } from "@/lib/data";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "included", label: "What's included" },
  { id: "activation", label: "Activation" },
  { id: "reviews", label: "Reviews" },
  { id: "faq", label: "FAQ" },
];

const reviews = [
  { name: "Marcus L.", hue: "#5ee6d0", rating: 5, time: "2 days ago", text: "Login worked on the first try, 2FA secret and backup codes were all there. Exactly as described." },
  { name: "Aiko T.", hue: "#ff7aa8", rating: 5, time: "1 week ago", text: "Paid with USDT on TRC-20, fees were basically zero. The library page keeps all my logins tidy." },
  { name: "Jonas B.", hue: "#f7b267", rating: 4, time: "3 weeks ago", text: "Great price. Needed one replacement and support swapped it in under 10 minutes." },
];

export function ProductDetail({ product: p }: { product: Product }) {
  const [src, setSrc] = useState<string | null>(null);
  const [edition, setEdition] = useState(1);
  const [qty, setQty] = useState(1);
  const multipliers = [0.62, 1, 1.85];
  const unit = Math.round(p.price * multipliers[edition] * 100) / 100;
  const total = unit * qty;

  useEffect(() => {
    const t = setTimeout(() => setSrc(coverUrl(p)), 1400);
    return () => clearTimeout(t);
  }, [p]);

  const buy = () =>
    toast.promise(new Promise((r) => setTimeout(r, 1600)), {
      loading: "Reserving your account…",
      success: `${p.name} delivered to your library`,
      error: "Payment failed",
    });

  const related = products.filter((x) => x.slug !== p.slug && (x.category === p.category || x.badge)).slice(0, 4);

  return (
    <div className="mx-auto max-w-[1320px] px-5 pt-2 lg:px-8 lg:pt-6">
      <nav className="flex items-center gap-1.5 text-[12.5px] text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="size-3.5" />
        <Link href="/products" className="hover:text-foreground">{p.category}</Link>
        <ChevronRight className="size-3.5" />
        <span className="truncate text-foreground">{p.name}</span>
      </nav>

      <div className="mt-5 grid gap-8 lg:mt-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
        <div className="flex flex-col gap-3">
          <div className="overflow-hidden rounded-[28px] ring-1 ring-white/[0.07]">
            <GridReveal src={src} aspect={4 / 3} caption="Rendering cover" estimatedDuration={1400} className="w-full" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-white/[0.07]" style={{ filter: i ? `hue-rotate(${i * 28}deg) saturate(${1 - i * 0.12})` : undefined }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={coverUrl(p)} alt="" className="size-full object-cover" style={{ transform: `scale(${1 + i * 0.25}) translate(${i * 6}%, ${i * -4}%)` }} />
                {i === 0 && <span className="absolute inset-0 rounded-2xl ring-2 ring-inset ring-iris" />}
              </div>
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex flex-wrap items-center gap-2">
            {p.badge && <Badge tone="iris">{p.badge}</Badge>}
            <Badge tone="mint" dot>In stock · {p.stock.toLocaleString()} available</Badge>
          </div>
          <h1 className="mt-4 text-[34px] font-semibold leading-[1] tracking-[-0.045em] sm:text-[46px]">{p.name}</h1>
          <p className="mt-2 text-[15px] text-muted-foreground">{p.edition}</p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-[13px] text-muted-foreground">
            <span className="flex items-center gap-1.5"><BadgeCheck className="size-4 text-iris" /> {p.vendor}</span>
            <Stars rating={p.rating} />
            <span>{p.reviews.toLocaleString()} reviews</span>
            <span>{p.sold.toLocaleString()} sold</span>
          </div>

          <div className="mt-7 rounded-[24px] panel p-5 sm:p-6">
            <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Option</p>
            <div className="-mx-1 overflow-x-auto px-1 scrollbar-none">
              <GooeyNav items={p.options} value={edition} onChange={setEdition} size="sm" activeColor="#9d8cff" activeLabelColor="#0b0a14" />
            </div>

            <div className="mt-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-[12px] text-muted-foreground">Total</p>
                <AnimatedCounter value={total} decimals={2} prefix="$" className="text-[40px] font-semibold tracking-[-0.04em]" />
                {p.compareAt && <p className="text-[12.5px] text-muted-foreground">List price <span className="line-through">${fmt(p.compareAt * multipliers[edition] * qty)}</span></p>}
              </div>
              <div className="flex items-center gap-1 rounded-full bg-white/[0.04] p-1 ring-1 ring-inset ring-white/10">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid size-9 place-items-center rounded-full hover:bg-white/10"><Minus className="size-4" /></button>
                <AnimatedCounter value={qty} className="w-6 justify-center text-[15px] font-semibold" />
                <button onClick={() => setQty((q) => Math.min(9, q + 1))} className="grid size-9 place-items-center rounded-full hover:bg-white/10"><Plus className="size-4" /></button>
              </div>
            </div>

            <PrimaryButton className="mt-6 h-13 w-full py-3.5 text-[15px]" onClick={buy}>
              <Zap className="size-4" /> Buy now · instant delivery
            </PrimaryButton>
            <div className="mt-3 flex items-center justify-between rounded-2xl bg-white/[0.03] px-4 py-3 text-[13px]">
              <span className="flex items-center gap-2 text-muted-foreground"><Wallet className="size-4 text-mint" /> Balance after purchase</span>
              <AnimatedCounter value={user.balance - total} decimals={2} prefix="$" className="font-semibold" />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 text-[12.5px]">
            {[
              { i: Globe2, t: `Region: ${p.region}` },
              { i: MonitorSmartphone, t: p.platform },
              { i: ShieldCheck, t: "Checked before listing" },
              { i: RefreshCcw, t: "72h replacement" },
            ].map((x) => (
              <div key={x.t} className="flex items-center gap-2.5 rounded-xl bg-white/[0.025] px-3 py-2.5 text-foreground/80 ring-1 ring-inset ring-white/[0.05]">
                <x.i className="size-4 shrink-0 text-iris" /> <span className="truncate">{x.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20 grid gap-12 lg:grid-cols-[200px_1fr_300px]">
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <RailToc items={sections} title="On this page" offset={140} />
          </div>
        </aside>

        <div className="flex min-w-0 flex-col gap-16">
          <section id="overview" className="scroll-mt-28">
            <h2 className="text-[26px] font-semibold tracking-[-0.03em]">Overview</h2>
            <p className="mt-4 text-[16px] leading-[1.75] text-foreground/80">{p.blurb} Every item is validated by our team before it is listed, and the delivery details stay in your Nocta library so you can copy them again at any time.</p>
            <p className="mt-4 text-[16px] leading-[1.75] text-foreground/80">Change the password and recovery email right after your first login. Our 72-hour replacement window starts at delivery.</p>
          </section>

          <section id="included" className="scroll-mt-28">
            <h2 className="text-[26px] font-semibold tracking-[-0.03em]">What&apos;s included</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {["Login + password", "Original email access", "2FA secret / backup codes", "Delivery format: " + p.platform, "Invoice for business expensing", "72h Nocta replacement guarantee"].map((x) => (
                <div key={x} className="flex items-center gap-3 rounded-2xl panel px-4 py-3.5 text-[14px]">
                  <span className="grid size-6 place-items-center rounded-full bg-mint/15 text-mint"><BadgeCheck className="size-3.5" /></span>
                  {x}
                </div>
              ))}
            </div>
          </section>

          <section id="activation" className="scroll-mt-28">
            <h2 className="text-[26px] font-semibold tracking-[-0.03em]">First login in 3 steps</h2>
            <div className="mt-5 rounded-[24px] panel p-5 sm:p-7">
              <StepPlayer steps={[{ label: "Copy details", duration: 2 }, { label: "Sign in with 2FA", duration: 2 }, { label: "Secure the account", duration: 2.4 }]} defaultPlaying loop className="w-full" />
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  ["01", "Copy your details", "Open Library → your order and copy login, password and 2FA."],
                  ["02", "Sign in with 2FA", "Use the 2FA secret or a backup code. Add an SMS number if asked."],
                  ["03", "Secure it", "Change the password and recovery email to your own."],
                ].map(([n, t, d]) => (
                  <div key={n}>
                    <p className="font-mono text-[12px] text-iris">{n}</p>
                    <p className="mt-1.5 text-[15px] font-medium">{t}</p>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-muted-foreground">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="reviews" className="scroll-mt-28">
            <div className="flex items-end justify-between">
              <h2 className="text-[26px] font-semibold tracking-[-0.03em]">Reviews</h2>
              <span className="text-[13px] text-muted-foreground">{p.rating} average · {p.reviews.toLocaleString()} reviews</span>
            </div>
            <div className="mt-5 flex flex-col gap-3">
              {reviews.map((r) => (
                <div key={r.name} className="rounded-[22px] panel p-5">
                  <div className="flex items-center gap-3">
                    <Avatar name={r.name} hue={r.hue} size={34} />
                    <div className="flex-1">
                      <p className="text-[14px] font-medium">{r.name} <span className="ml-1 text-[12px] font-normal text-muted-foreground">· verified buyer · {r.time}</span></p>
                      <Stars rating={r.rating} />
                    </div>
                    <EmojiReaction size="sm" align="right" onReact={() => toast("Reaction sent")} />
                  </div>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-foreground/80">{r.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="faq" className="scroll-mt-28">
            <h2 className="mb-5 text-[26px] font-semibold tracking-[-0.03em]">FAQ</h2>
            <div className="rounded-[24px] panel p-4 sm:p-6">
              <Faq
                accent="#9d8cff"
                avatar={<Logo compact />}
                items={[
                  { id: "a", question: "Is this a one-time purchase?", answer: "Yes. You pay once from your balance — no auto-renewal and no stored card." },
                  { id: "b", question: "Do I get the original email?", answer: "Yes. Profiles and BMs include the original email login so you can move recovery to your own address." },
                  { id: "c", question: "What if the login fails?", answer: "Open a replacement request from the order. We verify and replace within minutes, 24/7." },
                ]}
              />
            </div>
          </section>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-[22px] panel p-5">
            <p className="text-[13px] font-medium">Seller</p>
            <div className="mt-3 flex items-center gap-3">
              <Avatar name={p.vendor} hue={p.palette[0]} size={40} />
              <div>
                <p className="text-[14px] font-semibold">{p.vendor}</p>
                <p className="text-[12px] text-muted-foreground">Verified seller · since 2021</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-center">
              <div className="rounded-xl bg-white/[0.03] py-3"><p className="text-[18px] font-semibold">99.8%</p><p className="text-[11px] text-muted-foreground">valid on delivery</p></div>
              <div className="rounded-xl bg-white/[0.03] py-3"><p className="text-[18px] font-semibold">0.6s</p><p className="text-[11px] text-muted-foreground">avg delivery</p></div>
            </div>
          </div>
        </aside>
      </div>

      <section className="mt-24">
        <h2 className="text-[26px] font-semibold tracking-[-0.03em]">You may also like</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {related.map((r) => (
            <ProductCard key={r.slug} product={r} />
          ))}
        </div>
      </section>

      <ScrollProgress sections={sections} className="bottom-24 lg:bottom-6" />
    </div>
  );
}
