export type Category = "SMS verification" | "Business Manager" | "Profiles" | "Pages";

export type Product = {
  slug: string;
  name: string;
  edition: string;
  vendor: string;
  category: Category;
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  sold: number;
  stock: number;
  /** what the buyer receives */
  platform: string;
  /** geo / country */
  region: string;
  delivery: string;
  badge?: "Bestseller" | "New" | "Limited" | "-30%" | "Hot";
  palette: [string, string];
  shape: "rings" | "prism" | "orbit" | "grid" | "wave" | "shield" | "spark" | "stack" | "bubble";
  blurb: string;
  options: [string, string, string];
  unit?: string;
};

export const products: Product[] = [
  {
    slug: "bm-verified",
    name: "Business Manager",
    edition: "Verified · 5 ad accounts",
    vendor: "Nocta Verified",
    category: "Business Manager",
    price: 89,
    compareAt: 129,
    rating: 4.9,
    reviews: 2184,
    sold: 18420,
    stock: 412,
    platform: "Login + 2FA + backup codes",
    region: "Global",
    delivery: "Instant",
    badge: "Bestseller",
    palette: ["#9d8cff", "#ff7aa8"],
    shape: "prism",
    blurb: "Verified Business Manager with 5 ad account slots, clean history and admin access transferred to you.",
    options: ["3 ad accounts", "5 ad accounts", "Unlimited"],
  },
  {
    slug: "sms-usa",
    name: "SMS Verification",
    edition: "USA number · single SMS",
    vendor: "Nocta Numbers",
    category: "SMS verification",
    price: 0.45,
    compareAt: 0.65,
    rating: 4.8,
    reviews: 5210,
    sold: 412000,
    stock: 18900,
    platform: "Virtual number · 20 min window",
    region: "United States",
    delivery: "Instant",
    badge: "Hot",
    palette: ["#5ee6d0", "#5aa9ff"],
    shape: "bubble",
    blurb: "Receive a one-time verification SMS on a fresh US number. No code in 20 minutes? Your balance is refunded automatically.",
    options: ["Single SMS", "Multi-SMS · 1h", "Rent · 7 days"],
    unit: "/ SMS",
  },
  {
    slug: "profile-aged-2018",
    name: "Aged Profile",
    edition: "Created 2018 · 2FA enabled",
    vendor: "Nocta Verified",
    category: "Profiles",
    price: 24,
    compareAt: 32,
    rating: 4.7,
    reviews: 9312,
    sold: 76300,
    stock: 233,
    platform: "Login + email + 2FA",
    region: "EU",
    delivery: "Instant",
    badge: "-30%",
    palette: ["#f7b267", "#ff5d6c"],
    shape: "shield",
    blurb: "Long-standing profile with original email, 2FA secret and complete profile details.",
    options: ["Standard", "With friends 500+", "Marketplace on"],
  },
  {
    slug: "page-10k",
    name: "Brand Page",
    edition: "10K followers · Lifestyle",
    vendor: "Nocta Verified",
    category: "Pages",
    price: 149,
    rating: 4.6,
    reviews: 1120,
    sold: 2290,
    stock: 64,
    platform: "Admin role transfer",
    region: "Global",
    delivery: "Within 15 min",
    palette: ["#5aa9ff", "#9d8cff"],
    shape: "rings",
    blurb: "Established page with organic audience. Ownership is handed over by assigning you full admin access.",
    options: ["5K followers", "10K followers", "50K followers"],
  },
  {
    slug: "sms-uk",
    name: "SMS Verification",
    edition: "UK number · single SMS",
    vendor: "Nocta Numbers",
    category: "SMS verification",
    price: 0.38,
    rating: 4.8,
    reviews: 3408,
    sold: 198000,
    stock: 9640,
    platform: "Virtual number · 20 min window",
    region: "United Kingdom",
    delivery: "Instant",
    badge: "New",
    palette: ["#7dd3fc", "#5ee6d0"],
    shape: "bubble",
    blurb: "UK mobile number that receives verification codes from 600+ services. Auto-refund if no SMS arrives.",
    options: ["Single SMS", "Multi-SMS · 1h", "Rent · 7 days"],
    unit: "/ SMS",
  },
  {
    slug: "bm-limit-250",
    name: "Business Manager",
    edition: "$250 daily limit · 1 ad account",
    vendor: "Nocta Verified",
    category: "Business Manager",
    price: 39,
    compareAt: 55,
    rating: 4.9,
    reviews: 864,
    sold: 5100,
    stock: 88,
    platform: "Login + 2FA",
    region: "Global",
    delivery: "Instant",
    badge: "Limited",
    palette: ["#ff7aa8", "#f7b267"],
    shape: "stack",
    blurb: "Business Manager with a $250 daily spending limit unlocked and one ready-to-use ad account.",
    options: ["$50 limit", "$250 limit", "$1,500 limit"],
  },
  {
    slug: "profile-pack-10",
    name: "Profile Pack",
    edition: "10 profiles · email + 2FA",
    vendor: "Nocta Verified",
    category: "Profiles",
    price: 79,
    compareAt: 120,
    rating: 4.5,
    reviews: 4410,
    sold: 31800,
    stock: 1520,
    platform: "TXT file · login:pass:2FA",
    region: "Mixed",
    delivery: "Instant",
    palette: ["#ff5d6c", "#9d8cff"],
    shape: "grid",
    blurb: "Ten profiles delivered as a single file, each with its own email inbox and 2FA secret.",
    options: ["5 profiles", "10 profiles", "50 profiles"],
  },
  {
    slug: "sms-turkey",
    name: "SMS Verification",
    edition: "Turkey number · single SMS",
    vendor: "Nocta Numbers",
    category: "SMS verification",
    price: 0.22,
    compareAt: 0.3,
    rating: 4.6,
    reviews: 2730,
    sold: 276000,
    stock: 22100,
    platform: "Virtual number · 20 min window",
    region: "Turkey",
    delivery: "Instant",
    palette: ["#a3e635", "#5ee6d0"],
    shape: "bubble",
    blurb: "Local Turkish numbers for verification codes. Most SMS arrive within 15 seconds.",
    options: ["Single SMS", "Multi-SMS · 1h", "Rent · 7 days"],
    unit: "/ SMS",
  },
  {
    slug: "page-aged-2020",
    name: "Aged Page",
    edition: "Since 2020 · 1K likes",
    vendor: "Nocta Verified",
    category: "Pages",
    price: 29,
    compareAt: 39,
    rating: 4.9,
    reviews: 1204,
    sold: 9840,
    stock: 500,
    platform: "Admin role transfer",
    region: "Global",
    delivery: "Within 15 min",
    palette: ["#f7b267", "#9d8cff"],
    shape: "wave",
    blurb: "Aged page with a clean history, ready to rebrand. Name change allowance included.",
    options: ["1K likes", "5K likes", "20K likes"],
  },
  {
    slug: "bm-agency",
    name: "Agency Business Manager",
    edition: "Verified · 25 ad accounts",
    vendor: "Nocta Verified",
    category: "Business Manager",
    price: 349,
    rating: 4.8,
    reviews: 360,
    sold: 1270,
    stock: 36,
    platform: "Login + 2FA + backup codes",
    region: "Global",
    delivery: "Within 30 min",
    palette: ["#9d8cff", "#5aa9ff"],
    shape: "prism",
    blurb: "Agency-grade Business Manager with 25 ad account slots and pixel creation unlocked.",
    options: ["10 ad accounts", "25 ad accounts", "50 ad accounts"],
  },
  {
    slug: "sms-rent-30",
    name: "Number Rental",
    edition: "30 days · unlimited SMS",
    vendor: "Nocta Numbers",
    category: "SMS verification",
    price: 18,
    compareAt: 25,
    rating: 4.7,
    reviews: 6620,
    sold: 54100,
    stock: 3100,
    platform: "Dedicated number · 30 days",
    region: "35 countries",
    delivery: "Instant",
    badge: "-30%",
    palette: ["#5ee6d0", "#ff7aa8"],
    shape: "bubble",
    blurb: "A dedicated number that stays yours for 30 days. Receive unlimited SMS from any service.",
    options: ["7 days", "30 days", "90 days"],
  },
  {
    slug: "profile-marketplace",
    name: "Marketplace Profile",
    edition: "Marketplace enabled · 2FA",
    vendor: "Nocta Verified",
    category: "Profiles",
    price: 12,
    rating: 4.8,
    reviews: 980,
    sold: 8300,
    stock: 940,
    platform: "Login + email + 2FA",
    region: "US",
    delivery: "Instant",
    badge: "New",
    palette: ["#c9bfff", "#5ee6d0"],
    shape: "shield",
    blurb: "Profile with Marketplace access already enabled, original email and 2FA secret included.",
    options: ["Standard", "With friends 500+", "Aged 3y+"],
  },
];

export const categories: { name: Category; count: number }[] = [
  { name: "SMS verification", count: 182 },
  { name: "Business Manager", count: 1240 },
  { name: "Profiles", count: 3872 },
  { name: "Pages", count: 412 },
];

export const smsServices = [
  { name: "WhatsApp", price: 0.42, stock: 12400 },
  { name: "Telegram", price: 0.55, stock: 8900 },
  { name: "Google", price: 0.31, stock: 22100 },
  { name: "Instagram", price: 0.28, stock: 15300 },
  { name: "TikTok", price: 0.24, stock: 9800 },
  { name: "Discord", price: 0.19, stock: 6400 },
  { name: "X / Twitter", price: 0.33, stock: 7100 },
  { name: "Any other", price: 0.18, stock: 41000 },
];

export const smsCountries = [
  { name: "United States", flag: "🇺🇸", dial: "+1", mult: 1.4 },
  { name: "United Kingdom", flag: "🇬🇧", dial: "+44", mult: 1.2 },
  { name: "Turkey", flag: "🇹🇷", dial: "+90", mult: 0.7 },
  { name: "Germany", flag: "🇩🇪", dial: "+49", mult: 1.3 },
  { name: "Brazil", flag: "🇧🇷", dial: "+55", mult: 0.6 },
  { name: "Indonesia", flag: "🇮🇩", dial: "+62", mult: 0.5 },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const user = {
  name: "Elif Demir",
  handle: "elif.d",
  email: "elif@nocta.demo",
  tier: "Gold",
  balance: 1284.62,
  pending: 120,
  spent30d: 412.4,
  saved: 186.2,
};

export const coins = [
  { id: "USDT", name: "Tether", network: "TRC-20", networks: ["TRC-20", "ERC-20", "BEP-20"], rate: 1, color: "#5ee6d0", conf: 20, min: 10 },
  { id: "BTC", name: "Bitcoin", network: "Bitcoin", networks: ["Bitcoin", "Lightning"], rate: 96420.18, color: "#f7b267", conf: 2, min: 0.0002 },
  { id: "ETH", name: "Ethereum", network: "ERC-20", networks: ["ERC-20", "Arbitrum", "Base"], rate: 3612.4, color: "#9d8cff", conf: 12, min: 0.005 },
  { id: "SOL", name: "Solana", network: "Solana", networks: ["Solana"], rate: 212.7, color: "#ff7aa8", conf: 32, min: 0.1 },
] as const;

export type Purchase = {
  id: string;
  slug: string;
  date: string;
  price: number;
  code: string;
  status: "Delivered" | "Redeemed" | "Refunded";
};

export const purchases: Purchase[] = [
  { id: "ORD-58219", slug: "bm-verified", date: "Nov 21, 2026", price: 89, code: "bm_admin_7qx2@inbox.demo : ••••••••••• : 2FA K4ZT 8PQM", status: "Delivered" },
  { id: "ORD-58104", slug: "sms-usa", date: "Nov 18, 2026", price: 0.45, code: "+1 (415) 555-0148 → 482 913", status: "Redeemed" },
  { id: "ORD-57990", slug: "profile-aged-2018", date: "Nov 12, 2026", price: 24, code: "lena.m2018@inbox.demo : ••••••••• : 2FA 7Q9W XTAV", status: "Redeemed" },
  { id: "ORD-57712", slug: "page-10k", date: "Nov 03, 2026", price: 149, code: "Admin invite sent to elif@nocta.demo", status: "Delivered" },
  { id: "ORD-57388", slug: "sms-turkey", date: "Oct 27, 2026", price: 0.22, code: "+90 532 555 01 77 → 739 204", status: "Redeemed" },
  { id: "ORD-56901", slug: "profile-pack-10", date: "Oct 14, 2026", price: 79, code: "profiles_10x_ORD-56901.txt · 10 lines", status: "Delivered" },
  { id: "ORD-56450", slug: "bm-limit-250", date: "Sep 30, 2026", price: 39, code: "bm_limit_0p9k@inbox.demo : ••••••••", status: "Refunded" },
];

export type Tx = {
  id: string;
  type: "Deposit" | "Purchase" | "Refund" | "Bonus";
  label: string;
  asset: string;
  amount: number;
  usd: number;
  status: "Completed" | "Confirming" | "Failed";
  date: string;
  hash: string;
};

export const transactions: Tx[] = [
  { id: "TX-90412", type: "Deposit", label: "USDT deposit · TRC-20", asset: "USDT", amount: 500, usd: 500, status: "Completed", date: "Nov 22, 09:12", hash: "0x8f3a…c21e" },
  { id: "TX-90398", type: "Purchase", label: "Business Manager · Verified", asset: "USD", amount: -89, usd: -89, status: "Completed", date: "Nov 21, 18:40", hash: "—" },
  { id: "TX-90377", type: "Deposit", label: "BTC deposit · Bitcoin", asset: "BTC", amount: 0.00124, usd: 119.56, status: "Confirming", date: "Nov 21, 16:02", hash: "bc1q…9xk2" },
  { id: "TX-90301", type: "Bonus", label: "Gold tier cashback", asset: "USD", amount: 12.4, usd: 12.4, status: "Completed", date: "Nov 20, 00:00", hash: "—" },
  { id: "TX-90254", type: "Purchase", label: "SMS · USA number (×12)", asset: "USD", amount: -5.4, usd: -5.4, status: "Completed", date: "Nov 18, 11:25", hash: "—" },
  { id: "TX-90180", type: "Deposit", label: "ETH deposit · Base", asset: "ETH", amount: 0.12, usd: 433.49, status: "Completed", date: "Nov 15, 21:47", hash: "0x2b71…04fa" },
  { id: "TX-90122", type: "Purchase", label: "Aged Profile · 2018", asset: "USD", amount: -24, usd: -24, status: "Completed", date: "Nov 12, 20:13", hash: "—" },
  { id: "TX-90077", type: "Deposit", label: "SOL deposit · Solana", asset: "SOL", amount: 1.5, usd: 319.05, status: "Failed", date: "Nov 09, 14:30", hash: "5Hq1…mN8z" },
  { id: "TX-90031", type: "Refund", label: "Business Manager $250 · refund", asset: "USD", amount: 39, usd: 39, status: "Completed", date: "Oct 02, 10:05", hash: "—" },
];

export type Customer = {
  id: string;
  name: string;
  email: string;
  country: string;
  tier: "Bronze" | "Silver" | "Gold" | "Platinum";
  balance: number;
  spent: number;
  orders: number;
  joined: string;
  status: "Active" | "Flagged" | "Suspended";
  hue: string;
};

export const customers: Customer[] = [
  { id: "C-1042", name: "Elif Demir", email: "elif@nocta.demo", country: "TR", tier: "Gold", balance: 1284.62, spent: 4120.5, orders: 48, joined: "Mar 2025", status: "Active", hue: "#9d8cff" },
  { id: "C-1041", name: "Marcus Lindqvist", email: "marcus@mail.demo", country: "SE", tier: "Platinum", balance: 3210.0, spent: 12890.2, orders: 131, joined: "Jan 2024", status: "Active", hue: "#5ee6d0" },
  { id: "C-1040", name: "Aiko Tanaka", email: "aiko.t@mail.demo", country: "JP", tier: "Silver", balance: 84.1, spent: 980.4, orders: 17, joined: "Aug 2025", status: "Active", hue: "#ff7aa8" },
  { id: "C-1039", name: "Rafael Ortega", email: "rafa@mail.demo", country: "ES", tier: "Bronze", balance: 0, spent: 129.0, orders: 3, joined: "Nov 2026", status: "Flagged", hue: "#f7b267" },
  { id: "C-1038", name: "Noor Haddad", email: "noor.h@mail.demo", country: "AE", tier: "Gold", balance: 642.75, spent: 3410.0, orders: 39, joined: "Jun 2025", status: "Active", hue: "#5aa9ff" },
  { id: "C-1037", name: "Jonas Becker", email: "j.becker@mail.demo", country: "DE", tier: "Silver", balance: 18.0, spent: 1240.9, orders: 22, joined: "Feb 2025", status: "Suspended", hue: "#a3e635" },
  { id: "C-1036", name: "Chloé Martin", email: "chloe.m@mail.demo", country: "FR", tier: "Platinum", balance: 2088.3, spent: 9870.0, orders: 104, joined: "Oct 2023", status: "Active", hue: "#c9bfff" },
  { id: "C-1035", name: "Daniel Okafor", email: "dan.ok@mail.demo", country: "NG", tier: "Bronze", balance: 12.5, spent: 210.6, orders: 6, joined: "Sep 2026", status: "Active", hue: "#ff5d6c" },
];

export const codeBatches = [
  { id: "B-2291", slug: "profile-aged-2018", supplier: "Supplier #14", total: 2500, available: 1890, reserved: 42, sold: 568, cost: 18.2, imported: "Nov 20, 2026" },
  { id: "B-2288", slug: "bm-verified", supplier: "Supplier #03", total: 800, available: 233, reserved: 11, sold: 556, cost: 31.0, imported: "Nov 17, 2026" },
  { id: "B-2280", slug: "page-aged-2020", supplier: "Supplier #21", total: 600, available: 412, reserved: 6, sold: 182, cost: 52.0, imported: "Nov 14, 2026" },
  { id: "B-2274", slug: "bm-limit-250", supplier: "Supplier #03", total: 150, available: 88, reserved: 2, sold: 60, cost: 81.0, imported: "Nov 09, 2026" },
  { id: "B-2266", slug: "profile-marketplace", supplier: "Supplier #08", total: 6000, available: 5000, reserved: 120, sold: 880, cost: 44.9, imported: "Nov 02, 2026" },
  { id: "B-2259", slug: "bm-agency", supplier: "Supplier #03", total: 400, available: 36, reserved: 4, sold: 360, cost: 97.0, imported: "Oct 28, 2026" },
];

export const codes = [
  { code: "lena.m2018@inbox.demo | •••••••• | 2FA ••••", slug: "profile-aged-2018", status: "Available", batch: "B-2291", added: "Nov 20" },
  { code: "kai.r2018@inbox.demo | •••••••• | 2FA ••••", slug: "profile-aged-2018", status: "Reserved", batch: "B-2291", added: "Nov 20" },
  { code: "bm_7qx2@inbox.demo | •••••••• | backup ×8", slug: "bm-verified", status: "Sold", batch: "B-2288", added: "Nov 17" },
  { code: "bm_m9kd@inbox.demo | •••••••• | backup ×8", slug: "bm-verified", status: "Available", batch: "B-2288", added: "Nov 17" },
  { code: "page/aged-2020-lifestyle-0412", slug: "page-aged-2020", status: "Available", batch: "B-2280", added: "Nov 14" },
  { code: "bm_agency_88ka@inbox.demo | ••••••••", slug: "bm-agency", status: "Available", batch: "B-2259", added: "Oct 28" },
  { code: "bm_lim_2z7q@inbox.demo | ••••••••", slug: "bm-limit-250", status: "Revoked", batch: "B-2274", added: "Nov 09" },
] as const;

export const wallets = [
  { coin: "USDT", network: "TRC-20", address: "TQ7mN3k8vPz2xR4hW9cLb6Yt1sD5fG8jKa", balance: 48210.44, usd: 48210.44, status: "Active", confirmations: 20 },
  { coin: "BTC", network: "Bitcoin", address: "bc1qx7m3k8vpz2xr4hw9clb6yt1sd5fg8jka0q9rt", balance: 1.84211, usd: 177624.6, status: "Active", confirmations: 2 },
  { coin: "ETH", network: "ERC-20 · Base", address: "0x7A3f9C21bE40D8a1F5c6E92bB0dA4e71C9f2E810", balance: 22.418, usd: 80984.9, status: "Active", confirmations: 12 },
  { coin: "SOL", network: "Solana", address: "5Hq1vXeN8zK2pRt7WmL4cB9dJ3fA6gS0uY1oQ8iMnZ", balance: 310.2, usd: 65979.5, status: "Paused", confirmations: 32 },
] as const;

export const revenue = [
  42, 38, 51, 47, 55, 61, 58, 66, 72, 69, 78, 84, 80, 88, 95, 91, 99, 108, 102, 114, 121, 117, 126, 134, 129, 141, 148, 144, 156, 168,
];

export const orders = [
  { id: "ORD-58231", customer: "Marcus Lindqvist", slug: "bm-agency", total: 349, coin: "USDT", status: "Delivered", time: "2m ago" },
  { id: "ORD-58230", customer: "Aiko Tanaka", slug: "sms-rent-30", total: 18, coin: "ETH", status: "Delivered", time: "6m ago" },
  { id: "ORD-58229", customer: "Rafael Ortega", slug: "profile-pack-10", total: 237, coin: "BTC", status: "Review", time: "11m ago" },
  { id: "ORD-58228", customer: "Noor Haddad", slug: "bm-verified", total: 89, coin: "USDT", status: "Delivered", time: "18m ago" },
  { id: "ORD-58227", customer: "Chloé Martin", slug: "page-10k", total: 149, coin: "SOL", status: "Delivered", time: "24m ago" },
];

export function contributions(seed = 7, days = 182) {
  let s = seed;
  const rand = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  const end = new Date("2026-11-22T00:00:00Z");
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(end);
    d.setUTCDate(end.getUTCDate() - (days - 1 - i));
    const weekend = d.getUTCDay() === 0 || d.getUTCDay() === 6;
    const r = rand() * (0.6 + i / days) + (weekend ? 0.25 : 0);
    const level = (r < 0.35 ? 0 : r < 0.6 ? 1 : r < 0.8 ? 2 : r < 0.98 ? 3 : 4) as 0 | 1 | 2 | 3 | 4;
    return { date: d.toISOString().slice(0, 10), count: level * Math.ceil(rand() * 6), level };
  });
}

export const fmt = (n: number, d = 2) =>
  n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
