import type { Product } from "./data";

const shapes: Record<Product["shape"], (a: string, b: string) => string> = {
  rings: (a, b) =>
    [0, 1, 2, 3, 4]
      .map(
        (i) =>
          `<circle cx="400" cy="300" r="${70 + i * 42}" fill="none" stroke="${i % 2 ? b : a}" stroke-opacity="${0.75 - i * 0.12}" stroke-width="${10 - i * 1.5}"/>`,
      )
      .join("") + `<circle cx="400" cy="300" r="46" fill="url(#core)"/>`,
  prism: (a, b) =>
    `<path d="M400 120 L560 400 L240 400 Z" fill="url(#core)" opacity=".95"/><path d="M400 120 L560 400 L400 330 Z" fill="${b}" opacity=".55"/><path d="M400 330 L560 400 L240 400 Z" fill="#fff" opacity=".12"/><path d="M560 300 L760 250 M560 320 L760 330 M560 340 L760 410" stroke="${a}" stroke-width="6" stroke-linecap="round" opacity=".7"/>`,
  orbit: (a, b) =>
    `<ellipse cx="400" cy="300" rx="250" ry="90" fill="none" stroke="${a}" stroke-opacity=".5" stroke-width="3" transform="rotate(-18 400 300)"/><ellipse cx="400" cy="300" rx="250" ry="90" fill="none" stroke="${b}" stroke-opacity=".45" stroke-width="3" transform="rotate(32 400 300)"/><circle cx="400" cy="300" r="92" fill="url(#core)"/><circle cx="628" cy="226" r="16" fill="${b}"/><circle cx="196" cy="390" r="10" fill="${a}"/>`,
  grid: (a, b) =>
    Array.from({ length: 16 }, (_, i) => {
      const x = 260 + (i % 4) * 72;
      const y = 160 + Math.floor(i / 4) * 72;
      const on = [0, 5, 6, 9, 10, 15, 3, 12].includes(i);
      return `<rect x="${x}" y="${y}" width="58" height="58" rx="14" fill="${on ? (i % 3 ? a : b) : "#ffffff"}" fill-opacity="${on ? 0.9 : 0.06}"/>`;
    }).join(""),
  wave: (a, b) =>
    [0, 1, 2, 3, 4, 5]
      .map(
        (i) =>
          `<path d="M60 ${250 + i * 34} C 220 ${170 + i * 34}, 330 ${330 + i * 34}, 480 ${240 + i * 34} S 700 ${200 + i * 34}, 760 ${250 + i * 34}" fill="none" stroke="${i % 2 ? b : a}" stroke-width="${12 - i}" stroke-opacity="${0.9 - i * 0.12}" stroke-linecap="round"/>`,
      )
      .join("") + `<circle cx="560" cy="170" r="54" fill="url(#core)"/>`,
  shield: (a, b) =>
    `<path d="M400 110 L560 170 V300 C560 400 480 460 400 495 C320 460 240 400 240 300 V170 Z" fill="url(#core)"/><path d="M400 150 L525 196 V300 C525 380 465 430 400 460 Z" fill="#fff" opacity=".1"/><path d="M335 300 L385 350 L475 250" fill="none" stroke="#0a0b10" stroke-width="22" stroke-linecap="round" stroke-linejoin="round" opacity=".85"/><circle cx="400" cy="300" r="230" fill="none" stroke="${b}" stroke-opacity=".25" stroke-dasharray="4 14" stroke-width="3"/>`,
  spark: (a, b) =>
    `<path d="M400 90 C415 230 470 285 610 300 C470 315 415 370 400 510 C385 370 330 315 190 300 C330 285 385 230 400 90 Z" fill="url(#core)"/><path d="M610 150 C614 186 628 200 664 204 C628 208 614 222 610 258 C606 222 592 208 556 204 C592 200 606 186 610 150 Z" fill="${b}"/><path d="M210 400 C213 424 222 433 246 436 C222 439 213 448 210 472 C207 448 198 439 174 436 C198 433 207 424 210 400 Z" fill="${a}" opacity=".8"/>`,
  bubble: (a, b) =>
    `<rect x="190" y="150" width="330" height="190" rx="48" fill="url(#core)"/><path d="M250 330 L230 400 L310 338 Z" fill="${a}"/><g fill="#0a0b10" opacity=".8">${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${232 + i * 44}" y="222" width="32" height="46" rx="9"/>`).join("")}</g><rect x="400" y="300" width="230" height="130" rx="38" fill="${b}" fill-opacity=".35" stroke="${b}" stroke-opacity=".6" stroke-width="2"/><circle cx="470" cy="365" r="9" fill="#fff" opacity=".8"/><circle cx="515" cy="365" r="9" fill="#fff" opacity=".55"/><circle cx="560" cy="365" r="9" fill="#fff" opacity=".3"/>`,
  stack: (a, b) =>
    [2, 1, 0]
      .map(
        (i) =>
          `<rect x="${230 + i * 34}" y="${170 - i * 30}" width="340" height="220" rx="28" fill="${i === 0 ? "url(#core)" : i === 1 ? b : a}" fill-opacity="${i === 0 ? 1 : 0.35}" transform="rotate(${-8 + i * 6} 400 300)"/>`,
      )
      .join("") + `<rect x="270" y="330" width="120" height="18" rx="9" fill="#0a0b10" opacity=".5"/><circle cx="510" cy="230" r="26" fill="#fff" opacity=".35"/>`,
};

export function coverSvg(p: Pick<Product, "palette" | "shape" | "name" | "vendor">) {
  const [a, b] = p.palette;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
<defs>
<radialGradient id="g1" cx="18%" cy="8%" r="75%"><stop offset="0" stop-color="${a}" stop-opacity=".55"/><stop offset="1" stop-color="${a}" stop-opacity="0"/></radialGradient>
<radialGradient id="g2" cx="95%" cy="100%" r="70%"><stop offset="0" stop-color="${b}" stop-opacity=".5"/><stop offset="1" stop-color="${b}" stop-opacity="0"/></radialGradient>
<linearGradient id="core" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>
<pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.4" fill="#fff" fill-opacity=".08"/></pattern>
</defs>
<rect width="800" height="600" fill="#0b0c12"/>
<rect width="800" height="600" fill="url(#g1)"/>
<rect width="800" height="600" fill="url(#g2)"/>
<rect width="800" height="600" fill="url(#dots)"/>
${shapes[p.shape](a, b)}
</svg>`;
}

export const coverUrl = (p: Parameters<typeof coverSvg>[0]) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(coverSvg(p))}`;
