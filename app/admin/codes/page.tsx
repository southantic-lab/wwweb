"use client";

import { useState } from "react";
import { FileUp, Upload } from "lucide-react";
import CodeBlock from "@/components/ui/code-block";
import DeleteButton from "@/components/ui/delete-button";
import TaskList from "@/components/ui/task-list";
import { GooeyNav } from "@/components/ui/gooey-nav";
import { toast } from "@/components/ui/toast";
import { LiveCounter } from "@/components/site/live-counter";
import { PageHead } from "@/components/site/account-shell";
import { Badge, Cover, GhostButton, Panel, PanelHeader, PrimaryButton, statusTone } from "@/components/site/primitives";
import { codeBatches, codes, fmt, getProduct, products } from "@/lib/data";

const sample = `# format: login | password | email_pass | 2fa_secret
lena.m2018@inbox.demo | Vq7!mK2#pL9x | mx_44Tz!a | K4ZT8PQM7Q9WXTAV
kai.r2018@inbox.demo  | Hs2@nP8!wQ1z | mx_90Qa!k | 7Q9WXTAVK4ZT8PQM
noa.v2018@inbox.demo  | Lp5#tR3!vB7c | mx_12Xp!e | XTAV7Q9WK4ZT8PQM
# 3 lines parsed · 0 duplicates · 0 invalid`;

const statusTabs = ["All", "Available", "Reserved", "Sold", "Revoked"];

export default function StockInventory() {
  const [tab, setTab] = useState(0);
  const [target, setTarget] = useState(2);
  const total = codeBatches.reduce((a, b) => a + b.total, 0);
  const available = codeBatches.reduce((a, b) => a + b.available, 0);
  const reserved = codeBatches.reduce((a, b) => a + b.reserved, 0);
  const sold = codeBatches.reduce((a, b) => a + b.sold, 0);
  const items = codes.filter((c) => tab === 0 || c.status === statusTabs[tab]);
  const targets = products.filter((p) => p.category !== "SMS verification");

  const importStock = () =>
    toast.promise(new Promise((r) => setTimeout(r, 1800)), {
      loading: "Validating 3 accounts…",
      success: `3 accounts added to ${targets[target].name}`,
      error: "Import failed",
    });

  return (
    <>
      <PageHead
        eyebrow="Inventory"
        title={<>Stock <span className="font-display font-normal italic text-aurora">inventory.</span></>}
        sub="Accounts and pages waiting to be delivered. Every item is validated on import and again before delivery."
        action={<GhostButton onClick={() => toast.success("Inventory export ready")}><FileUp className="size-4" /> Export</GhostButton>}
      />

      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {[
          { l: "Total imported", v: total, c: "" },
          { l: "Available", v: available, c: "text-mint" },
          { l: "Reserved at checkout", v: reserved, c: "text-amber" },
          { l: "Delivered", v: sold, c: "text-iris" },
        ].map((k) => (
          <Panel key={k.l} className="p-4 sm:p-5">
            <p className="text-[12.5px] text-muted-foreground">{k.l}</p>
            <LiveCounter value={k.v} className={`mt-2 text-[26px] font-semibold tracking-[-0.04em] ${k.c}`} />
          </Panel>
        ))}
      </div>

      <div className="mt-4 grid gap-4 2xl:grid-cols-[1.2fr_1fr]">
        <Panel>
          <PanelHeader title="Import stock" hint="Paste lines or drop a .txt / .csv file" />
          <div className="flex flex-col gap-4 p-5 sm:p-6">
            <div className="-mx-1 overflow-x-auto px-1 scrollbar-none">
              <GooeyNav items={targets.map((t) => `${t.name} · ${t.edition.split("·")[0].trim()}`)} value={target} onChange={setTarget} size="xs" activeColor="#9d8cff" activeLabelColor="#0b0a14" />
            </div>
            <CodeBlock code={sample} language="bash" accent="#9d8cff" mode="dark" filename="import_preview.txt" />
            <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 px-4 py-6 text-center">
              <Upload className="size-5 text-muted-foreground" />
              <p className="text-[13px]">Drop a file here or <span className="text-iris">browse</span></p>
              <p className="text-[11.5px] text-muted-foreground">Duplicates and invalid lines are skipped automatically</p>
            </div>
            <PrimaryButton onClick={importStock}><Upload className="size-4" /> Validate & import 3 accounts</PrimaryButton>
          </div>
        </Panel>

        <div className="flex flex-col gap-4">
          <Panel>
            <PanelHeader title="Validation queue" hint="Checks run on every imported item" />
            <div className="px-3 pb-4 pt-2 sm:px-4">
              <TaskList
                accent="#5ee6d0"
                defaultTasks={[
                  { id: "1", label: "Login succeeds with provided password", done: true },
                  { id: "2", label: "Email inbox accessible", done: true },
                  { id: "3", label: "2FA secret generates valid codes" },
                  { id: "4", label: "No duplicate against existing stock" },
                  { id: "5", label: "Account not restricted or flagged" },
                ]}
              />
            </div>
          </Panel>
          <Panel>
            <PanelHeader title="Batches" />
            <div className="mt-3 flex flex-col gap-2 px-4 pb-4 sm:px-5">
              {codeBatches.slice(0, 4).map((b) => {
                const p = getProduct(b.slug)!;
                return (
                  <div key={b.id} className="flex items-center gap-3 rounded-2xl bg-white/[0.02] p-3 ring-1 ring-inset ring-white/[0.05]">
                    <Cover product={p} className="size-10 shrink-0 rounded-xl" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-medium">{p.name} <span className="font-mono text-[11px] text-muted-foreground">{b.id}</span></p>
                      <div className="mt-1.5 flex h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                        <span className="bg-iris" style={{ width: `${(b.sold / b.total) * 100}%` }} />
                        <span className="bg-amber" style={{ width: `${(b.reserved / b.total) * 100}%` }} />
                        <span className="bg-mint" style={{ width: `${(b.available / b.total) * 100}%` }} />
                      </div>
                      <p className="mt-1 text-[11px] text-muted-foreground">{b.supplier} · cost ${fmt(b.cost)} · {b.imported}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>
        </div>
      </div>

      <Panel className="mt-4">
        <PanelHeader title="Items" action={<span className="text-[12px] text-muted-foreground">Sensitive fields masked</span>} />
        <div className="-mx-0 mt-4 overflow-x-auto px-5 scrollbar-none sm:px-6">
          <GooeyNav items={statusTabs} value={tab} onChange={setTab} size="xs" activeColor="#eceef3" activeLabelColor="#0b0a14" />
        </div>
        <div className="mt-3 flex flex-col px-3 pb-3">
          {items.map((c) => {
            const p = getProduct(c.slug)!;
            return (
              <div key={c.code} className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl px-3 py-3 hover:bg-white/[0.02]">
                <span className="min-w-0 flex-1 truncate font-mono text-[12.5px] text-foreground/90">{c.code}</span>
                <span className="hidden w-48 truncate text-[12.5px] text-muted-foreground md:block">{p.name} · {p.edition.split("·")[0]}</span>
                <span className="hidden font-mono text-[11.5px] text-muted-foreground sm:block">{c.batch}</span>
                <Badge tone={statusTone(c.status)}>{c.status}</Badge>
                {c.status === "Available" ? <DeleteButton onConfirm={() => toast.success("Item revoked")} /> : <span className="w-10" />}
              </div>
            );
          })}
        </div>
      </Panel>
    </>
  );
}
