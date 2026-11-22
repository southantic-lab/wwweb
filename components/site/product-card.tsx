"use client";

import Link from "next/link";
import { Plus, Zap } from "lucide-react";
import { toast } from "@/components/ui/toast";
import { Badge, Cover, Stars } from "./primitives";
import { fmt, type Product } from "@/lib/data";
import { cn } from "@/lib/utils";

export function addToCart(p: Product) {
  toast.success(`${p.name} added`, {
    description: `${p.edition} · $${fmt(p.price)}`,
    action: { label: "Checkout", onClick: () => toast.info("Checkout is part of the next phase") },
  });
}

const badgeTone = { Bestseller: "iris", New: "mint", Limited: "amber", "-30%": "rose", Hot: "amber" } as const;

export function ProductCard({ product: p, className, size = "md" }: { product: Product; className?: string; size?: "md" | "lg" }) {
  const discount = p.compareAt ? Math.round((1 - p.price / p.compareAt) * 100) : 0;
  return (
    <div className={cn("group relative flex flex-col overflow-hidden rounded-[22px] panel transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(157,140,255,.45),inset_0_0_0_1px_rgba(255,255,255,.12)]", className)}>
      <Link href={`/products/${p.slug}`} className="relative block">
        <Cover product={p} className={cn("w-full transition-transform duration-700 group-hover:scale-[1.04]", size === "lg" ? "aspect-[4/3]" : "aspect-[5/4]")} />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          {p.badge ? <Badge tone={badgeTone[p.badge]} className="bg-[#07080c]/70 backdrop-blur-md">{p.badge}</Badge> : <span />}
          <span className="inline-flex h-6 items-center gap-1 rounded-full bg-[#07080c]/70 px-2 text-[11px] font-medium text-mint backdrop-blur-md">
            <Zap className="size-3" /> {p.delivery}
          </span>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0d0f15] to-transparent" />
      </Link>
      <div className="flex flex-1 flex-col gap-3 px-4 pb-4 pt-1 sm:px-5 sm:pb-5">
        <div className="flex items-center justify-between gap-2 text-[12px] text-muted-foreground">
          <span className="truncate">{p.category} · {p.region}</span>
          <Stars rating={p.rating} />
        </div>
        <Link href={`/products/${p.slug}`} className="min-w-0">
          <h3 className="truncate text-[16px] font-semibold tracking-[-0.02em] text-foreground">{p.name}</h3>
          <p className="truncate text-[13px] text-muted-foreground">{p.edition}</p>
        </Link>
        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <div className="flex items-baseline gap-2">
            <span className="whitespace-nowrap text-[19px] font-semibold tracking-[-0.02em] text-foreground tabular">${fmt(p.price)}{p.unit && <span className="ml-0.5 text-[12px] font-normal text-muted-foreground">{p.unit}</span>}</span>
            {p.compareAt && <span className={cn("text-[12.5px] text-muted-foreground line-through tabular", p.unit && "hidden sm:inline")}>${fmt(p.compareAt)}</span>}
            {discount > 0 && !p.unit && <span className="text-[12px] font-medium text-mint">−{discount}%</span>}
          </div>
          <button
            onClick={() => addToCart(p)}
            aria-label={`Add ${p.name} to cart`}
            className="grid size-10 shrink-0 place-items-center rounded-full bg-white/[0.06] text-foreground ring-1 ring-inset ring-white/10 transition-all hover:bg-[#eceef3] hover:text-[#0b0a14] active:scale-90"
          >
            <Plus className="size-[18px]" />
          </button>
        </div>
      </div>
    </div>
  );
}
