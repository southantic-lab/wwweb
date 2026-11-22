"use client";

import { useEffect, useRef } from "react";
import GravityLetters from "@/components/ui/gravity-letters";

const glyphs = ["₿", "Ξ", "◎", "₮", "N", "O", "C", "T", "A", "★", "⚡", "#", "$", "K", "E", "Y"];

export function GravityDemo({ className, autoplay = 14 }: { className?: string; autoplay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current?.querySelector<HTMLElement>("[data-slot=gravity-letters]");
    if (!host) return;
    let n = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const timer = setInterval(() => {
        const r = host.getBoundingClientRect();
        const opts = { bubbles: true, button: 0, pointerId: 900 + n, clientX: r.left + r.width * (0.12 + Math.random() * 0.76), clientY: r.top + 20 };
        host.dispatchEvent(new PointerEvent("pointerdown", opts));
        host.dispatchEvent(new PointerEvent("pointerup", opts));
        if (++n >= autoplay) clearInterval(timer);
      }, 140);
    });
    io.observe(host);
    return () => io.disconnect();
  }, [autoplay]);

  return (
    <div ref={ref} className={className}>
      <GravityLetters items={glyphs} size={44} gravity={1.1} color="#c9bfff" className="h-full w-full cursor-crosshair" />
    </div>
  );
}
