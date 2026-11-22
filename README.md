# Nocta — Dijital ürün pazaryeri (UI/UX prototipi)

SMS onay numaraları, Business Manager hesapları, profil ve sayfa satışı için premium, koyu temalı pazaryeri tasarımı.
**Sadece tasarım aşaması:** gerçek ödeme, veritabanı, kimlik doğrulama veya backend yok — tüm veriler demo.

## Çalıştırma

```bash
npm install
npm run dev          # http://localhost:3000
```

Tasarım vitrini (tüm sayfalar, 1440px + 390px yan yana): **http://localhost:3000/showcase**

## Sayfalar

| # | Sayfa | Yol |
|---|-------|-----|
| 1 | Ana sayfa | `/` |
| 2 | Ürün listesi | `/products` |
| 3 | Ürün detayı | `/products/bm-verified` |
| + | SMS onay | `/sms` |
| 4 | Müşteri paneli | `/account` |
| 5 | Kripto bakiye yükleme | `/account/deposit` |
| 6 | Satın aldıklarım | `/account/purchases` |
| 7 | İşlem geçmişi | `/account/transactions` |
| 8 | Admin paneli | `/admin` |
| 9 | Admin ürün yönetimi | `/admin/products` |
| 10 | Admin stok envanteri | `/admin/codes` |
| 11 | Admin kripto cüzdan ayarları | `/admin/wallets` |
| 12 | Admin müşteri yönetimi | `/admin/customers` |

## Rare UI

Bileşenler resmi `@rare-ui` shadcn registry'sinden kuruldu (`components.json` → `registries`), kaynak kodları `components/ui/` altında:

`gooey-nav, fluid-orb, animated-counter, notification-bell, toast, otp-input, password-input, delete-button, faq, task-list, github-activity, bounce-sidebar, hook-sidebar, proximity-sidebar, family-drawer, folder-component, step-player, scroll-progress, rail-toc, code-block, duration-picker, matrix-orb, ai-status, streaming-response, prompt-box, grid-reveal, gravity-letters, emoji-reaction`

Yeni bileşen eklemek: `npx shadcn@latest add @rare-ui/<isim>`
Claude Code MCP: `.mcp.json` (shadcn MCP) — Claude Code yeniden başlatıldığında `/mcp` altında görünür.

## Ekran görüntüleri

`screenshots/` klasöründe (Playwright ile çalışan uygulamadan alındı). Yeniden almak için: `node scripts/screenshot.cjs / out.png [1=mobil] [1=tam sayfa] [bekleme ms] [ölçek]`
