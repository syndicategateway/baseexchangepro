import { useEffect, useRef } from "react";

type Ember = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  hue: number;
};

const COLORS = ["#ff3d00", "#ffb300", "#d32f2f", "#ff6d00", "#ff8a3d"];

export function EmberCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let running = true;
    const embers: Ember[] = [];

    const countForWidth = (w: number) => {
      if (w < 480) return 48;
      if (w < 768) return 72;
      return 110;
    };

    const spawn = (w: number, h: number, fromTop = false): Ember => ({
      x: Math.random() * w,
      y: fromTop ? Math.random() * h : h + Math.random() * 40,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -(0.35 + Math.random() * 0.85),
      size: 0.8 + Math.random() * 2.6,
      alpha: 0.28 + Math.random() * 0.6,
      decay: 0.0012 + Math.random() * 0.0024,
      hue: Math.floor(Math.random() * COLORS.length),
    });

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = countForWidth(w);
      if (embers.length === 0) {
        for (let i = 0; i < target; i++) embers.push(spawn(w, h, true));
      } else if (embers.length < target) {
        while (embers.length < target) embers.push(spawn(w, h, true));
      } else {
        embers.length = target;
      }
    };

    const tick = () => {
      if (!running) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < embers.length; i++) {
        const p = embers[i];
        p.x += p.vx + Math.sin(p.y * 0.012) * 0.12;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.y < -10 || p.alpha <= 0) {
          embers[i] = spawn(w, h, false);
          continue;
        }

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = COLORS[p.hue];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.size > 1.4) {
          ctx.globalAlpha = p.alpha * 0.22;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    resize();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="ember-canvas" aria-hidden="true" />;
}
