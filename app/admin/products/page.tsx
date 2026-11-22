"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus, Save } from "lucide-react";
import DeleteButton from "@/components/ui/delete-button";
import DurationPicker from "@/components/ui/duration-picker";
import { GooeyNav } from "@/components/ui/gooey-nav";
import { toast } from "@/components/ui/toast";
import { PageHead } from "@/components/site/account-shell";
import { Badge, Cover, Panel, PanelHeader, PrimaryButton } from "@/components/site/primitives";
import { fmt, products as seed, type Product } from "@/lib/data";
import { cn } from "@/lib/utils";

const tabs = ["All", "SMS verification", "Business Manager", "Profiles", "Pages"];

function Switch({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className={cn("relative h-6 w-10 rounded-full transition-colors", on ? "bg-mint" : "bg-white/10")}>
      <motion.span layout transition={{ type: "spring", stiffness: 500, damping: 32 }} className={cn("absolute top-0.5 size-5 rounded-full bg-white shadow", on ? "right-0.5" : "left-0.5")} />
    </button>
  );
}

export default function AdminProducts() {
  const [list, setList] = useState(seed.map((p, i) => ({ ...p, live: i !== 6 })));
  const [tab, setTab] = useState(0);
  const [sel, setSel] = useState(list[0].slug);
  const current = list.find((p) => p.slug === sel) ?? list[0];
  const shown = list.filter((p) => tab === 0 || p.category === tabs[tab]);

  const update = (slug: string, patch: Partial<Product & { live: boolean }>) => setList((l) => l.map((p) => (p.slug === slug ? { ...p, ...patch } : p)));
  const remove = (slug: string) => {
    setTimeout(() => setList((l) => l.filter((p) => p.slug !== slug)), 900);
    toast.success("Listing removed");
  };

  return (
    <>
      <PageHead
        eyebrow="Catalog"
        title={<>Product <span className="font-display font-normal italic text-aurora">management.</span></>}
        sub={`${list.length} listings · ${list.filter((p) => p.live).length} live`}
        action={<PrimaryButton onClick={() => toast.info("New listing draft created")}><Plus className="size-4" /> New listing</PrimaryButton>}
      />

      <div className="-mx-5 mb-4 overflow-x-auto px-5 scrollbar-none sm:mx-0 sm:px-0">
        <GooeyNav items={tabs} value={tab} onChange={setTab} size="sm" activeColor="#eceef3" activeLabelColor="#0b0a14" />
      </div>

      <div className="grid gap-4 2xl:grid-cols-[1fr_380px]">
        <Panel className="overflow-hidden">
          <div className="hidden grid-cols-[1fr_120px_90px_90px_70px_64px] gap-4 border-b border-white/[0.06] px-6 py-4 text-[11.5px] uppercase tracking-[0.12em] text-muted-foreground md:grid">
            <span>Listing</span><span>Category</span><span className="text-right">Price</span><span className="text-right">Stock</span><span>Live</span><span />
          </div>
          <AnimatePresence initial={false}>
            {shown.map((p) => (
              <motion.div
                key={p.slug}
                layout
                exit={{ opacity: 0, height: 0 }}
                onClick={() => setSel(p.slug)}
                className={cn(
                  "grid cursor-pointer grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 border-b border-white/[0.04] px-4 py-3 last:border-0 md:grid-cols-[1fr_120px_90px_90px_70px_64px] md:px-6",
                  sel === p.slug ? "bg-iris/[0.06]" : "hover:bg-white/[0.02]",
                )}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <Cover product={p} className="size-11 shrink-0 rounded-xl" />
                  <div className="min-w-0">
                    <p className="truncate text-[14px] font-medium">{p.name}</p>
                    <p className="truncate text-[12px] text-muted-foreground">{p.edition}</p>
                  </div>
                </div>
                <span className="hidden text-[12.5px] text-muted-foreground md:block">{p.category}</span>
                <span className="text-right text-[14px] font-semibold tabular">${fmt(p.price)}</span>
                <span className={cn("hidden text-right text-[13px] tabular md:block", p.stock < 100 ? "text-amber" : "text-muted-foreground")}>{p.stock.toLocaleString()}</span>
                <div onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 md:block">
                  <Switch on={p.live} onChange={() => { update(p.slug, { live: !p.live }); toast(p.live ? `${p.name} paused` : `${p.name} is live`); }} />
                  <span className="text-[12px] text-muted-foreground md:hidden">{p.live ? "Live" : "Paused"} · {p.stock} in stock</span>
                </div>
                <div onClick={(e) => e.stopPropagation()} className="justify-self-end">
                  <DeleteButton onConfirm={() => remove(p.slug)} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </Panel>

        <Panel className="self-start 2xl:sticky 2xl:top-24">
          <PanelHeader title="Edit listing" hint={current.slug} action={<Badge tone={current.live ? "mint" : "amber"} dot>{current.live ? "Live" : "Paused"}</Badge>} />
          <div className="flex flex-col gap-4 p-5 sm:p-6">
            <Cover product={current} className="aspect-[16/9] rounded-2xl" />
            <label className="flex flex-col gap-1.5">
              <span className="text-[12px] text-muted-foreground">Title</span>
              <input value={current.name} onChange={(e) => update(current.slug, { name: e.target.value })} className="h-11 rounded-xl bg-white/[0.03] px-3.5 text-[14px] outline-none ring-1 ring-inset ring-white/10 focus:ring-iris/60" />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-[12px] text-muted-foreground">Variant</span>
              <input value={current.edition} onChange={(e) => update(current.slug, { edition: e.target.value })} className="h-11 rounded-xl bg-white/[0.03] px-3.5 text-[14px] outline-none ring-1 ring-inset ring-white/10 focus:ring-iris/60" />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex flex-col gap-1.5">
                <span className="text-[12px] text-muted-foreground">Price (USD)</span>
                <input type="number" value={current.price} onChange={(e) => update(current.slug, { price: Number(e.target.value) })} className="h-11 rounded-xl bg-white/[0.03] px-3.5 text-[14px] outline-none ring-1 ring-inset ring-white/10 focus:ring-iris/60" />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[12px] text-muted-foreground">Compare-at</span>
                <input type="number" value={current.compareAt ?? ""} onChange={(e) => update(current.slug, { compareAt: Number(e.target.value) || undefined })} className="h-11 rounded-xl bg-white/[0.03] px-3.5 text-[14px] outline-none ring-1 ring-inset ring-white/10 focus:ring-iris/60" />
              </label>
            </div>
            <div>
              <span className="text-[12px] text-muted-foreground">Options</span>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {current.options.map((o) => <span key={o} className="rounded-full bg-white/[0.05] px-3 py-1.5 text-[12.5px] ring-1 ring-inset ring-white/10">{o}</span>)}
                <button className="rounded-full px-3 py-1.5 text-[12.5px] text-iris border border-dashed border-iris/40">+ Add</button>
              </div>
            </div>
            <div className="rounded-2xl bg-white/[0.02] p-4 ring-1 ring-inset ring-white/[0.06]">
              <p className="text-[13px] font-medium">Replacement window</p>
              <p className="mb-3 mt-0.5 text-[12px] text-muted-foreground">How long buyers can request a free replacement.</p>
              <DurationPicker defaultValue={{ hours: 72, minutes: 0 }} maxHours={168} onConfirm={(v) => toast.success(`Window set to ${v.hours}h ${v.minutes}m`)} />
            </div>
            <PrimaryButton onClick={() => toast.success("Listing saved", { description: current.name })}><Save className="size-4" /> Save changes</PrimaryButton>
          </div>
        </Panel>
      </div>
    </>
  );
}
