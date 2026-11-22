"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Eye, LifeBuoy, Lock, X } from "lucide-react";
import FolderComponent from "@/components/ui/folder-component";
import OtpInput from "@/components/ui/otp-input";
import CodeBlock from "@/components/ui/code-block";
import { toast } from "@/components/ui/toast";
import { PageHead } from "@/components/site/account-shell";
import { Badge, Cover, GhostButton, Panel, PrimaryButton, statusTone } from "@/components/site/primitives";
import { fmt, getProduct, purchases, type Purchase } from "@/lib/data";
import { cn } from "@/lib/utils";

const folders = [
  { name: "SMS verification", color: "blue" as const, n: 214 },
  { name: "Business Manager", color: "white" as const, n: 18 },
  { name: "Profiles", color: "black" as const, n: 12 },
  { name: "Pages", color: "black" as const, n: 4 },
];

function details(o: Purchase) {
  const p = getProduct(o.slug)!;
  if (p.category === "SMS verification") return `# ${p.edition}\nnumber:   ${o.code.split(" → ")[0]}\ncode:     ${o.code.split(" → ")[1] ?? "—"}\nreceived: ${o.date} 09:12:44\nservice:  WhatsApp`;
  if (p.category === "Pages") return `# ${p.name} · ${p.edition}\nhandover: admin invite\ninvitee:  elif@nocta.demo\nstatus:   accepted\nnote:     rename allowance 1×`;
  return `# ${p.name} · ${p.edition}\nlogin:    ${o.code.split(" : ")[0]}\npassword: Vq7!mK2#pL9x\nemail:    same as login (IMAP access)\n2fa:      K4ZT 8PQM 7Q9W XTAV\nbackup:   4821-9930, 1047-7712, 6650-3318`;
}

export default function PurchasesPage() {
  const [folder, setFolder] = useState<number | null>(null);
  const [open, setOpen] = useState<Purchase | null>(null);
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const list = purchases.filter((o) => folder === null || getProduct(o.slug)!.category === folders[folder].name);

  const verify = (v: string) => {
    if (v === "000000") {
      setStatus("error");
      return;
    }
    setStatus("success");
    setTimeout(() => {
      if (open) setUnlocked((u) => [...u, open.id]);
      toast.success("Details unlocked", { description: "Change the password after your first login" });
      setOpen(null);
      setPin("");
      setStatus("idle");
    }, 700);
  };

  return (
    <>
      <PageHead eyebrow="Library" title={<>My <span className="font-display font-normal italic text-aurora">purchases.</span></>} sub="Every login, number and handover you've bought — encrypted and always one tap away." />

      <div className="-mx-5 overflow-x-auto px-5 pb-2 scrollbar-none">
        <div className="flex gap-3 lg:grid lg:grid-cols-4">
          {folders.map((f, i) => (
            <button
              key={f.name}
              onClick={() => setFolder(folder === i ? null : i)}
              className={cn("flex min-w-[230px] flex-col items-center rounded-[22px] pb-4 pt-2 ring-1 ring-inset transition-colors", folder === i ? "bg-white/[0.06] ring-iris/40" : "bg-white/[0.02] ring-white/[0.06] hover:bg-white/[0.04]")}
            >
              <div className="h-[196px] w-full pt-3">
                <FolderComponent color={f.color} size="sm" />
              </div>
              <span className="text-[13.5px] font-medium">{f.name}</span>
              <span className="text-[11.5px] text-muted-foreground">{f.n} items</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {list.map((o) => {
          const p = getProduct(o.slug)!;
          const shown = unlocked.includes(o.id);
          return (
            <Panel key={o.id} className="p-4 sm:p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  <Cover product={p} className="size-14 shrink-0 rounded-2xl sm:size-16" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-[15px] font-semibold">{p.name}</p>
                      <Badge tone={statusTone(o.status)} className="h-5 text-[10.5px]">{o.status}</Badge>
                    </div>
                    <p className="truncate text-[12.5px] text-muted-foreground">{p.edition}</p>
                    <p className="mt-0.5 font-mono text-[11.5px] text-muted-foreground">{o.id} · {o.date} · ${fmt(o.price)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <GhostButton className="h-10 px-4 text-[13px]" onClick={() => toast.info("Replacement request opened", { description: `${o.id} · reply within 10 min` })}>
                    <LifeBuoy className="size-4" /> Replace
                  </GhostButton>
                  {o.status !== "Refunded" && (
                    <PrimaryButton className="h-10 px-4 text-[13px]" onClick={() => (shown ? setUnlocked((u) => u.filter((x) => x !== o.id)) : setOpen(o))}>
                      {shown ? <><X className="size-4" /> Hide</> : <><Eye className="size-4" /> Reveal</>}
                    </PrimaryButton>
                  )}
                </div>
              </div>
              <AnimatePresence initial={false}>
                {shown && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="pt-4">
                      <CodeBlock code={details(o)} language="yaml" accent="#9d8cff" mode="dark" filename={`${o.id}.txt`} showLineNumbers={false} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {!shown && o.status !== "Refunded" && (
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-white/[0.025] px-3.5 py-2.5 font-mono text-[12.5px] text-muted-foreground">
                  <Lock className="size-3.5" /> {o.code.replace(/[A-Za-z0-9]/g, (ch, i) => (i < 6 ? ch : "•"))}
                </div>
              )}
            </Panel>
          );
        })}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[70] grid place-items-end bg-black/60 p-3 backdrop-blur-sm sm:place-items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 40, scale: 0.96 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 40, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 340, damping: 30 }}
              className="w-full max-w-[420px] rounded-[30px] bg-[#0f1118] p-6 text-center ring-1 ring-white/10 sm:p-8"
            >
              <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-iris/15 text-iris"><Lock className="size-5" /></span>
              <h3 className="mt-4 text-[20px] font-semibold tracking-[-0.03em]">Confirm it&apos;s you</h3>
              <p className="mt-1.5 text-[13.5px] text-muted-foreground">Enter the 6-digit code from your authenticator to reveal {getProduct(open.slug)!.name}.</p>
              <div className="mt-6 flex justify-center">
                <OtpInput value={pin} onChange={(v) => { setPin(v); setStatus("idle"); }} onComplete={verify} status={status} autoFocus mask />
              </div>
              <p className="mt-4 text-[12px] text-muted-foreground">Demo: any code works except 000000</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
