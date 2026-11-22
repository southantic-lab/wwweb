import { cn } from "@/lib/utils";
import { coverUrl } from "@/lib/cover";
import type { Product } from "@/lib/data";
import { useId, type ComponentProps, type ReactNode } from "react";

export function Logo({ className, compact }: { className?: string; compact?: boolean }) {
  const gid = `nl${useId().replace(/:/g, "")}`;
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative grid size-8 place-items-center overflow-hidden rounded-[10px] bg-[#11121a] hairline">
        <svg viewBox="0 0 32 32" className="size-5">
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#c9bfff" />
              <stop offset="1" stopColor="#5ee6d0" />
            </linearGradient>
          </defs>
          <path d="M22.5 5.5a11 11 0 1 0 4 15.2A9 9 0 1 1 22.5 5.5Z" fill={`url(#${gid})`} />
          <circle cx="23" cy="9" r="2" fill="#fff" />
        </svg>
      </span>
      {!compact && (
        <span className="text-[17px] font-semibold tracking-[-0.03em] text-foreground">
          nocta<span className="text-iris">.</span>
        </span>
      )}
    </span>
  );
}

export function Cover({ product, className, ...props }: { product: Product } & ComponentProps<"div">) {
  return (
    <div className={cn("relative overflow-hidden bg-[#0b0c12]", className)} {...props}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={coverUrl(product)} alt="" className="absolute inset-0 size-full object-cover" draggable={false} />
    </div>
  );
}

export function Panel({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn("panel rounded-[22px]", className)} {...props}>
      {children}
    </div>
  );
}

export function PanelHeader({ title, hint, action, className }: { title: ReactNode; hint?: ReactNode; action?: ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-start justify-between gap-4 px-5 pt-5 sm:px-6 sm:pt-6", className)}>
      <div className="min-w-0">
        <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-foreground">{title}</h3>
        {hint && <p className="mt-0.5 text-[13px] text-muted-foreground">{hint}</p>}
      </div>
      {action}
    </div>
  );
}

const tones = {
  iris: "bg-iris/12 text-[#c9bfff] ring-iris/25",
  mint: "bg-mint/10 text-mint ring-mint/25",
  amber: "bg-amber/10 text-amber ring-amber/25",
  rose: "bg-rose/10 text-rose ring-rose/25",
  red: "bg-[#ff5d6c]/10 text-[#ff8a95] ring-[#ff5d6c]/25",
  neutral: "bg-white/[0.04] text-muted-foreground ring-white/10",
} as const;

export type Tone = keyof typeof tones;

export function Badge({ tone = "neutral", className, children, dot }: { tone?: Tone; className?: string; children: ReactNode; dot?: boolean }) {
  return (
    <span className={cn("inline-flex h-6 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 text-[11.5px] font-medium ring-1 ring-inset", tones[tone], className)}>
      {dot && <span className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

export const statusTone = (s: string): Tone =>
  ({
    Completed: "mint",
    Delivered: "mint",
    Active: "mint",
    Available: "mint",
    Redeemed: "iris",
    Confirming: "amber",
    Reserved: "amber",
    Review: "amber",
    Paused: "amber",
    Flagged: "amber",
    Sold: "neutral",
    Refunded: "rose",
    Failed: "red",
    Revoked: "red",
    Suspended: "red",
  })[s] as Tone ?? "neutral";

export function PrimaryButton({ className, children, ...props }: ComponentProps<"button">) {
  return (
    <button
      className={cn(
        "group relative inline-flex h-11 items-center justify-center gap-2 overflow-hidden rounded-full bg-[#eceef3] px-5 text-[14px] font-semibold text-[#0b0a14] shadow-[0_0_0_1px_rgba(255,255,255,.2),0_8px_30px_-8px_rgba(157,140,255,.6)] transition-transform active:scale-[0.97]",
        className,
      )}
      {...props}
    >
      <span className="absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,rgba(157,140,255,.35)_45%,rgba(94,230,208,.35)_55%,transparent_75%)] bg-[length:250%_100%] bg-[position:120%_0] transition-[background-position] duration-700 group-hover:bg-[position:-20%_0]" />
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </button>
  );
}

export function GhostButton({ className, children, ...props }: ComponentProps<"button">) {
  return (
    <button
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white/[0.04] px-5 text-[14px] font-medium text-foreground ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/[0.07] active:scale-[0.97]",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Avatar({ name, hue = "#9d8cff", size = 36, className }: { name: string; hue?: string; size?: number; className?: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <span
      className={cn("grid shrink-0 place-items-center rounded-full font-semibold text-[#0b0a14]", className)}
      style={{ width: size, height: size, fontSize: size * 0.36, background: `linear-gradient(135deg, ${hue}, #eceef3)` }}
    >
      {initials}
    </span>
  );
}

export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 text-[12.5px] text-muted-foreground", className)}>
      <svg viewBox="0 0 20 20" className="size-3.5 fill-amber">
        <path d="M10 1.8l2.5 5.3 5.8.7-4.3 4 1.1 5.7L10 14.7l-5.1 2.8L6 11.8l-4.3-4 5.8-.7z" />
      </svg>
      <span className="font-medium text-foreground">{rating.toFixed(1)}</span>
    </span>
  );
}

export function SectionTitle({ eyebrow, title, sub, className, action }: { eyebrow?: string; title: ReactNode; sub?: ReactNode; className?: string; action?: ReactNode }) {
  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="max-w-2xl">
        {eyebrow && <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-iris">{eyebrow}</p>}
        <h2 className="text-[30px] font-semibold leading-[1.05] tracking-[-0.035em] text-foreground sm:text-[42px]">{title}</h2>
        {sub && <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export function Serif({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("font-display font-normal italic tracking-[-0.01em]", className)}>{children}</span>;
}

export function AreaChart({ data, className, color = "#9d8cff", height = 220 }: { data: number[]; className?: string; color?: string; height?: number }) {
  const w = 720;
  const h = height;
  const max = Math.max(...data) * 1.1;
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - (v / max) * (h - 16)] as const);
  const line = pts.map(([x, y], i) => {
    if (i === 0) return `M${x},${y}`;
    const [px, py] = pts[i - 1];
    const cx = (px + x) / 2;
    return `C${cx},${py} ${cx},${y} ${x},${y}`;
  }).join(" ");
  const last = pts[pts.length - 1];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className={cn("w-full", className)} style={{ height }}>
      <defs>
        <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity=".35" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5ee6d0" />
          <stop offset="1" stopColor={color} />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1="0" x2={w} y1={h * f} y2={h * f} stroke="rgba(255,255,255,.05)" strokeDasharray="3 6" vectorEffect="non-scaling-stroke" />
      ))}
      <path d={`${line} L${w},${h} L0,${h} Z`} fill="url(#area)" />
      <path d={line} fill="none" stroke="url(#stroke)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
      <circle cx={last[0] - 2} cy={last[1]} r="4" fill={color} />
    </svg>
  );
}

export function Sparkline({ data, color = "#5ee6d0", className }: { data: number[]; color?: string; className?: string }) {
  const w = 120;
  const h = 36;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const d = data
    .map((v, i) => `${i ? "L" : "M"}${(i / (data.length - 1)) * w},${h - ((v - min) / (max - min || 1)) * (h - 4) - 2}`)
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn("h-9 w-[120px]", className)}>
      <path d={d} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function FakeQr({ seed = 3, className }: { seed?: number; className?: string }) {
  const n = 25;
  let s = seed;
  const rand = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const cells: ReactNode[] = [];
  const finder = (x: number, y: number) => x < 7 && y < 7;
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) {
      const inFinder = finder(x, y) || finder(n - 1 - x, y) || finder(x, n - 1 - y);
      if (inFinder) continue;
      if (rand() > 0.52) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" rx=".25" />);
    }
  const F = ({ x, y }: { x: number; y: number }) => (
    <g transform={`translate(${x} ${y})`}>
      <rect width="7" height="7" rx="2" />
      <rect x="1" y="1" width="5" height="5" rx="1.4" fill="#f4f4f7" />
      <rect x="2" y="2" width="3" height="3" rx=".8" />
    </g>
  );
  return (
    <svg viewBox={`-1 -1 ${n + 2} ${n + 2}`} className={cn("rounded-2xl bg-[#f4f4f7] fill-[#0b0c12]", className)}>
      {cells}
      <F x={0} y={0} />
      <F x={n - 7} y={0} />
      <F x={0} y={n - 7} />
    </svg>
  );
}

export function CoinGlyph({ coin, size = 32 }: { coin: string; size?: number }) {
  const map: Record<string, { c: string; t: string }> = {
    USDT: { c: "#5ee6d0", t: "₮" },
    BTC: { c: "#f7b267", t: "₿" },
    ETH: { c: "#9d8cff", t: "Ξ" },
    SOL: { c: "#ff7aa8", t: "◎" },
    USD: { c: "#eceef3", t: "$" },
  };
  const m = map[coin] ?? map.USD;
  return (
    <span
      className="grid shrink-0 place-items-center rounded-full font-semibold"
      style={{ width: size, height: size, fontSize: size * 0.48, color: m.c, background: `${m.c}1a`, boxShadow: `inset 0 0 0 1px ${m.c}40` }}
    >
      {m.t}
    </span>
  );
}
