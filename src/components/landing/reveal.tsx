import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "article" | "li" | "section";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    const showIfVisible = () => {
      const box = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (box.top < vh * 0.94 && box.bottom > 48) setShown(true);
    };

    showIfVisible();

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.06, rootMargin: "80px 0px -8% 0px" },
    );
    io.observe(el);
    window.addEventListener("scroll", showIfVisible, { passive: true });
    window.addEventListener("resize", showIfVisible);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", showIfVisible);
      window.removeEventListener("resize", showIfVisible);
    };
  }, []);

  const style: CSSProperties = { transitionDelay: shown ? `${delay}ms` : "0ms" };

  return (
    <Tag
      ref={ref as never}
      className={cn("reveal", shown && "reveal-in", className)}
      style={style}
    >
      {children}
    </Tag>
  );
}
