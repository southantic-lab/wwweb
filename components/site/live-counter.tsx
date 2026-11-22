"use client";

import { useEffect, useRef, useState, type ComponentProps } from "react";
import AnimatedCounter from "@/components/ui/animated-counter";

type Props = Omit<ComponentProps<typeof AnimatedCounter>, "value"> & {
  value: number;
  from?: number;
  delay?: number;
};

export function LiveCounter({ value, from = 0, delay = 150, ...props }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(from);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let t: ReturnType<typeof setTimeout>;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          t = setTimeout(() => setShown(value), delay);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, [value, delay]);

  return (
    <span ref={ref} className="inline-flex">
      <AnimatedCounter value={shown} {...props} />
    </span>
  );
}
