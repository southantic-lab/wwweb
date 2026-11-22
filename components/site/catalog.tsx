"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Check, Flame, LayoutGrid, Rows3, SlidersHorizontal, X } from "lucide-react";
import { GooeyNav } from "@/components/ui/gooey-nav";
import { HookSidebar } from "@/components/ui/hook-sidebar";
import AnimatedCounter from "@/components/ui/animated-counter";
import { ProductCard, addToCart } from "./product-card";
import { Badge, Cover, PrimaryButton, Stars } from "./primitives";
import { categories, fmt, products } from "@/lib/data";
import { cn } from "@/lib/utils";

const cats = ["All products", ...categories.map((c) => c.name)];
const sorts = ["Popular", "Newest", "Price ↑", "Deals"];
const prices = ["Any", "< $30", "$30–80", "$80+"];
const platforms = ["Windows", "macOS", "Linux", "Mobile", "Web"];

export function Catalog() {
  const params = useSearchParams();
  const [cat, setCat] = useState(0);
  const [sort, setSort] = useState(params.get("sort") === "deals" ? 3 : 0);
  const [price, setPrice] = useState(0);
  const [plats, setPlats] = useState<string[]>(["Windows"]);
  const [view, setView] = useState<"grid" | "rows">("grid");
  const [sheet, setSheet] = useState(false);

  const list = useMemo(() => {
    let l = products.filter((p) => cat === 0 || p.category === cats[cat]);
    if (price === 1) l = l.filter((p) => p.price < 30);
    if (price === 2) l = l.filter((p) => p.price >= 30 && p.price <= 80);
    if (price === 3) l = l.filter((p) => p.price > 80);
    if (sort === 0) l = [...l].sort((a, b) => b.sold - a.sold);
    if (sort === 1) l = [...l].reverse();
    if (sort === 2) l = [...l].sort((a, b) => a.price - b.price);
    if (sort === 3) l = [...l].filter((p) => p.compareAt).sort((a, b) => b.compareAt! / b.price - a.compareAt! / a.price);
    return l;
  }, [cat, sort, price]);

  const deal = products[5];

  const filters = (
    <div className="flex flex-col gap-9">
      <HookSidebar items={cats} label="Categories" value={cat} onChange={setCat} color="#9d8cff" />
      <div>
        <p className="pb-3 text-sm font-medium uppercase tracking-wide text-foreground">Price</p>
        <div className="flex flex-wrap gap-2">
          {prices.map((p, i) => (
            <button
              key={p}
              onClick={() => setPrice(i)}
              className={cn(
                "h-8 rounded-full px-3 text-[12.5px] ring-1 ring-inset transition-colors",
                price === i ? "bg-[#eceef3] text-[#0b0a14] ring-transparent" : "bg-white/[0.03] text-foreground/80 ring-white/10 hover:bg-white/[0.06]",
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="pb-3 text-sm font-medium uppercase tracking-wide text-foreground">Platform</p>
        <div className="flex flex-col gap-1">
          {platforms.map((p) => {
            const on = plats.includes(p);
            return (
              <button
                key={p}
                onClick={() => setPlats((s) => (on ? s.filter((x) => x !== p) : [...s, p]))}
                className="flex h-9 items-center gap-3 rounded-lg px-1 text-[13.5px] text-foreground/80 hover:text-foreground"
              >
                <span className={cn("grid size-[18px] place-items-center rounded-[6px] ring-1 ring-inset transition-colors", on ? "bg-iris text-[#0b0a14] ring-iris" : "ring-white/15")}>
                  {on && <Check className="size-3" strokeWidth={3} />}
                </span>
                {p}
              </button>
            );
          })}
        </div>
      </div>
      <div className="rounded-2xl bg-mint/[0.06] p-4 ring-1 ring-inset ring-mint/15">
        <p className="text-[13px] font-medium text-mint">Instant delivery only</p>
        <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">All 12,400 listings are delivered automatically from verified stock.</p>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-[1320px] px-5 pb-10 pt-4 lg:px-8 lg:pt-8">
      <div className="flex flex-col gap-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-iris">Catalog</p>
        <h1 className="text-[34px] font-semibold leading-none tracking-[-0.045em] sm:text-[52px]">
          {cat === 0 ? <>Every account, <span className="font-display font-normal italic text-aurora">one place.</span></> : cats[cat]}
        </h1>
      </div>

      {/* deal of the day */}
      <div className="relative mt-8 grid overflow-hidden rounded-[26px] panel sm:grid-cols-[1.1fr_1fr] lg:grid-cols-[1.5fr_1fr]">
        <div className="relative z-10 flex flex-col justify-between gap-6 p-6 sm:p-8">
          <div>
            <Badge tone="amber" dot><Flame className="size-3" /> Deal of the day · ends in 07:42:19</Badge>
            <h2 className="mt-4 text-[26px] font-semibold tracking-[-0.035em] sm:text-[34px]">{deal.name} <span className="text-muted-foreground">{deal.edition.split("·")[0]}</span></h2>
            <p className="mt-2 max-w-md text-[14px] text-muted-foreground">{deal.blurb}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-baseline gap-2">
              <span className="text-[30px] font-semibold tracking-[-0.03em]">${fmt(deal.price)}</span>
              <span className="text-[14px] text-muted-foreground line-through">${fmt(deal.compareAt!)}</span>
            </div>
            <PrimaryButton onClick={() => addToCart(deal)}>Grab the deal</PrimaryButton>
            <div className="hidden items-center gap-2 text-[12.5px] text-muted-foreground sm:flex">
              <div className="h-1.5 w-28 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[68%] rounded-full bg-amber" /></div>
              68% claimed
            </div>
          </div>
        </div>
        <Cover product={deal} className="h-48 sm:h-auto" />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[232px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-28">{filters}</div>
        </aside>

        <div className="min-w-0">
          {/* mobile category rail */}
          <div className="-mx-5 mb-4 overflow-x-auto px-5 scrollbar-none lg:hidden">
            <GooeyNav items={cats} value={cat} onChange={setCat} size="xs" activeColor="#9d8cff" activeLabelColor="#0b0a14" />
          </div>

          <div className="flex items-center justify-between gap-3">
            <p className="text-[13.5px] text-muted-foreground">
              <AnimatedCounter value={list.length * 97 + 14} className="font-semibold text-foreground" /> results
            </p>
            <div className="flex items-center gap-2">
              <div className="hidden sm:block">
                <GooeyNav items={sorts} value={sort} onChange={setSort} size="sm" activeColor="#eceef3" activeLabelColor="#0b0a14" />
              </div>
              <div className="hidden items-center rounded-xl bg-white/[0.03] p-1 ring-1 ring-inset ring-white/[0.08] md:flex">
                {(["grid", "rows"] as const).map((v) => (
                  <button key={v} onClick={() => setView(v)} className={cn("grid size-8 place-items-center rounded-lg transition-colors", view === v ? "bg-white/10 text-foreground" : "text-muted-foreground")}>
                    {v === "grid" ? <LayoutGrid className="size-4" /> : <Rows3 className="size-4" />}
                  </button>
                ))}
              </div>
              <button onClick={() => setSheet(true)} className="inline-flex h-9 items-center gap-2 rounded-full bg-white/[0.05] px-3.5 text-[13px] ring-1 ring-inset ring-white/10 lg:hidden">
                <SlidersHorizontal className="size-4" /> Filters
              </button>
            </div>
          </div>

          <div className="-mx-5 mt-3 overflow-x-auto px-5 scrollbar-none sm:hidden">
            <GooeyNav items={sorts} value={sort} onChange={setSort} size="xs" activeColor="#eceef3" activeLabelColor="#0b0a14" />
          </div>

          <motion.div layout className={cn("mt-6 grid gap-3 sm:gap-5", view === "grid" ? "grid-cols-2 xl:grid-cols-3" : "grid-cols-1")}>
            <AnimatePresence mode="popLayout">
              {list.map((p) =>
                view === "grid" ? (
                  <motion.div key={p.slug} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}>
                    <ProductCard product={p} className="h-full" />
                  </motion.div>
                ) : (
                  <motion.div key={p.slug} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-5 rounded-[20px] panel p-3 pr-5">
                    <Cover product={p} className="h-20 w-28 shrink-0 rounded-xl" />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-[13px] text-muted-foreground">{p.edition} · {p.platform}</p>
                    </div>
                    <Stars rating={p.rating} />
                    <span className="w-24 text-right font-semibold">${fmt(p.price)}</span>
                    <button onClick={() => addToCart(p)} className="h-9 rounded-full bg-white/[0.06] px-4 text-[13px] ring-1 ring-inset ring-white/10 hover:bg-white/10">Add</button>
                  </motion.div>
                ),
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {sheet && (
          <>
            <motion.div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSheet(false)} />
            <motion.div
              className="fixed inset-x-2 bottom-2 z-50 max-h-[80vh] overflow-y-auto rounded-[30px] bg-[#0f1118] p-6 ring-1 ring-white/10 lg:hidden"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <p className="text-[17px] font-semibold">Filters</p>
                <button onClick={() => setSheet(false)} className="grid size-8 place-items-center rounded-full bg-white/[0.06]"><X className="size-4" /></button>
              </div>
              {filters}
              <PrimaryButton className="mt-8 w-full" onClick={() => setSheet(false)}>Show {list.length * 97 + 14} results</PrimaryButton>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
