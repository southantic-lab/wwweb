import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HomeHero } from "@/components/site/home-hero";
import { Bento, CategoryStrip, HomeFaq, Trending } from "@/components/site/home-sections";
import { Concierge } from "@/components/site/concierge";
import { GravityDemo } from "@/components/site/gravity-demo";
import { PrimaryButton } from "@/components/site/primitives";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-20 lg:gap-32">
      <HomeHero />
      <div className="-mt-10 lg:-mt-20">
        <CategoryStrip />
      </div>
      <Trending />
      <section className="mx-auto w-full max-w-[1320px] px-5 lg:px-8">
        <Concierge />
      </section>
      <Bento />
      <HomeFaq />
      <section className="mx-auto w-full max-w-[1320px] px-5 lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] bg-[#0b0c12] ring-1 ring-inset ring-white/[0.07]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(157,140,255,.25),transparent_60%)]" />
          <GravityDemo className="absolute inset-0" />
          <div className="pointer-events-none relative flex min-h-[420px] flex-col items-center justify-start px-6 pt-14 text-center sm:min-h-[460px] sm:pt-16">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-iris">Tap anywhere · hold to pour</p>
            <h2 className="mt-4 max-w-2xl text-[34px] font-semibold leading-[1] tracking-[-0.045em] sm:text-[56px]">
              Your next account is <span className="font-display font-normal italic text-aurora">one tap</span> away.
            </h2>
            <Link href="/products" className="pointer-events-auto mt-8">
              <PrimaryButton className="h-12 px-6">
                Start shopping <ArrowRight className="size-4" />
              </PrimaryButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
