"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, BadgeCheck, Clock3, Zap } from "lucide-react";
import FluidOrb from "@/components/ui/fluid-orb";
import { LiveCounter } from "./live-counter";
import { CoinGlyph, Cover, GhostButton, PrimaryButton } from "./primitives";
import { products } from "@/lib/data";

const float = (d: number) => ({
  initial: { opacity: 0, y: 24, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { delay: d, type: "spring" as const, stiffness: 120, damping: 20 },
});

export function HomeHero() {
  const hero = products[0];
  return (
    <section className="relative w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_70%_30%,black_10%,transparent_65%)]" />
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-[620px] w-[620px] rounded-full bg-iris/20 blur-[140px]" />
      <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-5 pb-16 pt-6 lg:grid-cols-[1.05fr_1fr] lg:px-8 lg:pb-28 lg:pt-14">
        <div className="relative z-10 order-2 lg:order-1">
          <motion.div {...float(0.05)} className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] py-1 pl-1 pr-3 text-[12.5px] text-foreground/80 ring-1 ring-inset ring-white/10">
            <span className="rounded-full bg-mint/15 px-2 py-0.5 text-[11px] font-semibold text-mint">NEW</span>
            SMS numbers from 35 countries are live
            <ArrowRight className="size-3.5 text-muted-foreground" />
          </motion.div>
          <motion.h1 {...float(0.12)} className="mt-6 text-[44px] font-semibold leading-[0.95] tracking-[-0.05em] text-foreground sm:text-[64px] xl:text-[84px]">
            Digital goods,
            <br />
            <span className="font-display text-[1.08em] font-normal italic tracking-[-0.02em] text-aurora">delivered</span> before
            <br className="hidden sm:block" /> the block confirms.
          </motion.h1>
          <motion.p {...float(0.2)} className="mt-6 max-w-[520px] text-[16px] leading-relaxed text-muted-foreground sm:text-[17px]">
            SMS verification numbers, Business Manager accounts, aged profiles and pages. Top up with crypto once, check out in one tap, get your access in seconds.
          </motion.p>
          <motion.div {...float(0.28)} className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/products">
              <PrimaryButton className="h-12 px-6 text-[15px]">
                Explore the catalog <ArrowRight className="size-4" />
              </PrimaryButton>
            </Link>
            <Link href="/account/deposit">
              <GhostButton className="h-12 px-5 text-[15px]">
                <span className="flex -space-x-1.5">
                  {["USDT", "BTC", "ETH", "SOL"].map((c) => (
                    <CoinGlyph key={c} coin={c} size={22} />
                  ))}
                </span>
                Top up balance
              </GhostButton>
            </Link>
          </motion.div>
          <motion.dl {...float(0.36)} className="mt-12 grid max-w-[560px] grid-cols-3 gap-6 border-t border-white/[0.06] pt-6">
            {[
              { v: 1.2, s: "M+", d: 1, l: "SMS received" },
              { v: 0.8, s: "s", d: 1, l: "median delivery" },
              { v: 4.9, s: "/5", d: 1, l: "from 48k reviews" },
            ].map((s) => (
              <div key={s.l}>
                <dt className="text-[28px] font-semibold tracking-[-0.04em] text-foreground sm:text-[34px]">
                  <LiveCounter value={s.v} decimals={s.d} suffix={<span className="text-muted-foreground">{s.s}</span>} duration={1.2} />
                </dt>
                <dd className="mt-1 text-[12.5px] text-muted-foreground">{s.l}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <div className="relative order-1 mx-auto grid h-[340px] w-full max-w-[560px] place-items-center sm:h-[460px] lg:order-2 lg:h-[600px]">
          <div className="absolute inset-0 grid place-items-center">
            <div className="absolute size-[300px] rounded-full ring-1 ring-white/[0.05] sm:size-[440px] lg:size-[560px]" />
            <div className="absolute size-[220px] rounded-full border border-dashed border-white/[0.08] sm:size-[330px] lg:size-[420px]" />
          </div>
          <FluidOrb size={480} color="#7c6cff" className="hidden shadow-[0_0_160px_-20px_rgba(124,108,255,.7)] lg:block" />
          <FluidOrb size={300} color="#7c6cff" className="hidden shadow-[0_0_120px_-20px_rgba(124,108,255,.7)] sm:block lg:hidden" />
          <FluidOrb size={220} color="#7c6cff" className="shadow-[0_0_100px_-20px_rgba(124,108,255,.7)] sm:hidden" />

          <motion.div {...float(0.5)} className="absolute left-0 top-[8%] w-[200px] rounded-2xl glass p-3 sm:left-[-4%] sm:w-[240px]">
            <div className="flex items-center gap-2 text-[11.5px] text-muted-foreground">
              <span className="grid size-5 place-items-center rounded-full bg-mint/15 text-mint"><Zap className="size-3" /></span>
              SMS received · +1 415 555 0148
            </div>
            <p className="mt-2 font-mono text-[12px] tracking-wider text-foreground sm:text-[13px]">Your code: 482 913</p>
          </motion.div>

          <motion.div {...float(0.62)} className="absolute bottom-[6%] right-0 w-[210px] rounded-2xl glass p-3 sm:bottom-[10%] sm:right-[-2%] sm:w-[250px]">
            <div className="flex items-center gap-3">
              <CoinGlyph coin="USDT" size={34} />
              <div className="min-w-0">
                <p className="text-[12px] text-muted-foreground">Deposit confirmed</p>
                <p className="text-[15px] font-semibold text-foreground">+500.00 USDT</p>
              </div>
            </div>
            <div className="mt-3 flex gap-1">
              {Array.from({ length: 20 }).map((_, i) => (
                <span key={i} className="h-1 flex-1 rounded-full bg-mint" style={{ opacity: 0.35 + i / 30 }} />
              ))}
            </div>
            <p className="mt-1.5 text-[11px] text-muted-foreground">20/20 confirmations · TRC-20</p>
          </motion.div>

          <motion.div {...float(0.74)} className="absolute bottom-[30%] left-[2%] hidden w-[220px] overflow-hidden rounded-2xl glass sm:block">
            <Cover product={hero} className="aspect-[16/9]" />
            <div className="flex items-center justify-between p-3">
              <div>
                <p className="text-[13px] font-semibold">{hero.name}</p>
                <p className="flex items-center gap-1 text-[11.5px] text-muted-foreground"><BadgeCheck className="size-3 text-iris" /> Verified · 2FA included</p>
              </div>
              <span className="text-[14px] font-semibold">${hero.price}</span>
            </div>
          </motion.div>

          <motion.div {...float(0.86)} className="absolute right-[4%] top-[4%] hidden items-center gap-2 rounded-full glass px-3 py-2 text-[12px] text-foreground/90 sm:flex">
            <Clock3 className="size-3.5 text-amber" /> 2,184 BMs sold in 24h
          </motion.div>
        </div>
      </div>
    </section>
  );
}
