import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Cpu,
  Flame,
  Globe2,
  Headset,
  Landmark,
  Lock,
  Menu,
  ShieldCheck,
  UserPlus,
  Wallet,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmberCanvas } from "@/components/landing/ember-canvas";
import { Reveal } from "@/components/landing/reveal";
import { cn, formatUsd } from "@/lib/utils";

const HEADLINE_PREFIX = "Forge Your Future with ";
const HIGHLIGHT = "Base Exchange Pro";
const HEADLINE = `${HEADLINE_PREFIX}${HIGHLIGHT}`;
const DAILY_RATE = 0.0075;
const TICKER = [
  "USDT vault credited · 12,400",
  "Rail DBS-SG settled",
  "Operator desk online · 99.98%",
  "EUR rail Revolut live",
  "Yield epoch closed +0.75%",
  "Compliance ledger synced",
];

const STEPS = [
  {
    n: "01",
    title: "Register in System",
    body: "Create an operator profile. Identity is verified once, then the desk is yours.",
    icon: UserPlus,
  },
  {
    n: "02",
    title: "Top Up Balance (USDT)",
    body: "Fund the operational vault in USDT. Capital is ring-fenced per seat.",
    icon: Wallet,
  },
  {
    n: "03",
    title: "Add Bank Accounts",
    body: "Connect settlement rails. Multi-jurisdiction banks, one routing table.",
    icon: Landmark,
  },
  {
    n: "04",
    title: "Start Operating & Yielding",
    body: "Flows run on the engine. You supervise; the desk compounds the rest.",
    icon: Zap,
  },
];

const BENEFITS = [
  {
    title: "Global bank support",
    body: "Coverage across major corridors — USD, EUR, GBP and regional rails — with live status on every account.",
    icon: Globe2,
  },
  {
    title: "Dedicated manager guidance",
    body: "A named desk manager walks the first thirty days: rails, limits, and operating cadence.",
    icon: Headset,
  },
  {
    title: "Automated system",
    body: "Routing, reconciliation and yield posting run without night shifts. Exceptions surface, not noise.",
    icon: Cpu,
  },
  {
    title: "7+ years operating",
    body: "The same core ledger since 2018. No reboot, no “new protocol,” no vanishing team.",
    icon: ShieldCheck,
  },
];

const FEATURES = [
  {
    title: "Instant USDT settlement",
    body: "Vault credits land as soon as the chain confirms. No batch windows, no “next business day.”",
    span: "md:col-span-4",
    icon: Zap,
  },
  {
    title: "Encrypted operational vault",
    body: "Keys never sit on the operator laptop. Withdrawals require dual control.",
    span: "md:col-span-2",
    icon: Lock,
  },
  {
    title: "Multi-rail routing",
    body: "The engine picks the cheapest live rail per corridor. Failed legs retry automatically.",
    span: "md:col-span-2",
    icon: Building2,
  },
  {
    title: "Compliance-ready ledgers",
    body: "Every flow is timestamped, hashed and exportable. Auditors get a file, not a story.",
    span: "md:col-span-2",
    icon: ShieldCheck,
  },
  {
    title: "24/7 liquidity desk",
    body: "Human coverage when the engine raises a hand. Not a chatbot. Not a ticket queue.",
    span: "md:col-span-2",
    icon: Headset,
  },
];

const BAR_WEIGHTS = [0.82, 0.94, 1.08, 0.88, 1.14, 0.97, 1.06];

export function LandingPage({
  onLogin,
  onApply,
}: {
  onLogin: () => void;
  onApply: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="page-shell">
      <EmberCanvas />
      <div className="grain" aria-hidden="true" />
      <Navbar
        menuOpen={menuOpen}
        onMenuOpen={setMenuOpen}
        onLogin={onLogin}
      />
      <Hero onApply={onApply} />
      <HowItWorks />
      <Calculator />
      <Features />
      <Benefits />
      <CtaBand onApply={onApply} />
      <Footer />
    </div>
  );
}

function Navbar({
  menuOpen,
  onMenuOpen,
  onLogin,
}: {
  menuOpen: boolean;
  onMenuOpen: (open: boolean) => void;
  onLogin: () => void;
}) {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const links = [
    { href: "#how-it-works", label: "How It Works" },
    { href: "#benefits", label: "Benefits" },
    { href: "#features", label: "Features" },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-200",
        solid ? "nav-solid" : "nav-clear",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:h-[4.25rem] md:px-6">
        <a href="#top" className="flex min-w-0 items-center gap-2" aria-label="Base Exchange Pro home">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-bg-surface glow-ember">
            <Flame className="size-4 text-fire-orange" />
          </span>
          <span className="logo-type truncate font-display text-[0.82rem] font-semibold tracking-wide sm:text-[0.95rem] md:text-base">
            Base Exchange Pro
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-text-muted md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="transition-[color] duration-150 hover:text-text-light"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button onClick={onLogin} className="hidden md:inline-flex">
            Dashboard Login
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => onMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-fire-red/40 bg-bg-deep/95 px-4 py-6 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="flex h-12 items-center text-base"
                onClick={() => onMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <Button
              className="mt-3 w-full"
              onClick={() => {
                onMenuOpen(false);
                onLogin();
              }}
            >
              Dashboard Login
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function Hero({ onApply }: { onApply: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [typed, setTyped] = useState(HEADLINE_PREFIX);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setTyped(HEADLINE);
      setDone(true);
      return;
    }
    let i = HEADLINE_PREFIX.length;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(HEADLINE.slice(0, i));
      if (i >= HEADLINE.length) {
        window.clearInterval(id);
        setDone(true);
      }
    }, 28);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  const hi = typed.indexOf(HIGHLIGHT);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative min-h-dvh overflow-hidden pt-24 pb-16 md:pt-28"
    >
      <div className="hero-light pointer-events-none absolute inset-0" />
      <div className="hero-forge" aria-hidden="true" />
      <div className="hero-vignette pointer-events-none absolute inset-0" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 text-center md:px-6">
        <p className="eyebrow">Operator infrastructure</p>
        <h1 className="hero-title mt-5 min-h-[3.4em] max-w-4xl md:min-h-[2.5em]">
          {hi === -1 ? (
            <>
              {typed}
              {!done ? <span className="caret" aria-hidden="true" /> : null}
            </>
          ) : (
            <>
              {typed.slice(0, hi)}
              <span className="text-fire">{typed.slice(hi)}</span>
              {!done ? <span className="caret" aria-hidden="true" /> : null}
            </>
          )}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-muted md:text-lg">
          Stable income and flexible remote work. We provide the infrastructure
          for automating and optimizing digital resource flows.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Button size="lg" onClick={onApply} className="min-w-52 pl-6 pr-5">
            Start Earning Today
            <ArrowRight />
          </Button>
          <Button size="lg" variant="outline" asChild className="min-w-52">
            <a href="#calculator">
              Model your yield
              <ArrowUpRight />
            </a>
          </Button>
        </div>

        <dl className="mt-14 grid w-full max-w-3xl grid-cols-2 gap-6 md:grid-cols-4 md:gap-4">
          <HeroStat value="7+" label="Years live" />
          <HeroStat value="40+" label="Bank corridors" />
          <HeroStat value="99.98%" label="Desk uptime" />
          <HeroStat value="24/7" label="Human coverage" />
        </dl>
      </div>

      <div className="ticker relative mt-16 overflow-hidden border-y border-text-light/8 py-3">
        <div className="ticker-track gap-10 px-6 text-xs tracking-[0.18em] text-text-muted uppercase">
          {[...TICKER, ...TICKER].map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center gap-3">
              <span className="live-dot size-1.5 rounded-full bg-fire-orange" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="font-display text-2xl font-semibold text-fire-gold md:text-3xl">{value}</dt>
      <dd className="mt-1 text-xs tracking-wide text-text-muted uppercase">{label}</dd>
    </div>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
      <Reveal>
        <p className="section-kicker">How it works</p>
        <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
          Four steps. Then the desk runs.
        </h2>
        <p className="mt-3 max-w-xl text-text-muted">
          No token to learn. No protocol to “ape.” Register, fund, connect rails,
          operate.
        </p>
      </Reveal>

      <ol className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <Reveal key={step.n} as="li" delay={i * 80}>
            <StepCard step={step} />
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

function StepCard({
  step,
}: {
  step: (typeof STEPS)[number];
}) {
  const ref = useRef<HTMLElement>(null);

  function onMove(e: ReactPointerEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) scale(1.03)`;
  }

  function onLeave() {
    if (ref.current) ref.current.style.transform = "";
  }

  const Icon = step.icon;

  return (
    <article
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="step-card h-full p-6"
    >
      <div className="flex items-center justify-between">
        <span className="font-display text-sm tracking-[0.2em] text-fire-gold">{step.n}</span>
        <Icon className="size-5 text-fire-orange" />
      </div>
      <h3 className="mt-8 font-display text-xl font-semibold">{step.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-text-muted">{step.body}</p>
    </article>
  );
}

function Calculator() {
  const [capital, setCapital] = useState(2500);
  const daily = capital * DAILY_RATE;
  const monthly = daily * 30;
  const pct = ((capital - 100) / (10000 - 100)) * 100;
  const maxBar = Math.max(...BAR_WEIGHTS);

  return (
    <section id="calculator" className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <Reveal className="panel overflow-hidden rounded-2xl p-6 md:p-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <p className="section-kicker">Yield model</p>
            <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
              Simulate operational yield
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              Indicative <span className="text-fire-gold">0.75% daily</span> operational
              yield on vaulted USDT. Figures are simulated for demonstration only
              and are not a promise of return.
            </p>

            <label className="mt-8 block">
              <span className="flex items-center justify-between text-sm">
                <span className="text-text-muted">Initial operational capital</span>
                <span className="font-display text-lg text-fire-gold tabular-nums">
                  {formatUsd(capital, 0)} USDT
                </span>
              </span>
              <input
                className="fire-slider mt-4"
                type="range"
                min={100}
                max={10000}
                step={50}
                value={capital}
                aria-valuemin={100}
                aria-valuemax={10000}
                aria-valuenow={capital}
                aria-label="Operational capital in USDT"
                onChange={(e) => setCapital(Number(e.target.value))}
                style={{
                  background: `linear-gradient(90deg, var(--fire-orange) ${pct}%, rgba(255,255,255,0.08) ${pct}%)`,
                }}
              />
            </label>

            <div className="mt-4 flex flex-wrap gap-2">
              {[500, 2000, 5000, 10000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setCapital(preset)}
                  className={cn(
                    "h-10 rounded-md px-3 text-xs font-medium transition-[background-color,color] duration-150",
                    capital === preset
                      ? "bg-fire-red text-text-light"
                      : "bg-bg-deep text-text-muted hover:text-text-light",
                  )}
                >
                  {formatUsd(preset, 0)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6 rounded-xl bg-bg-deep p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs tracking-wide text-text-muted uppercase">Est. daily</p>
                <p className="mt-1 font-display text-3xl font-semibold text-fire-gold tabular-nums">
                  {formatUsd(daily)}
                </p>
              </div>
              <div>
                <p className="text-xs tracking-wide text-text-muted uppercase">Est. monthly</p>
                <p className="mt-1 font-display text-3xl font-semibold tabular-nums">
                  {formatUsd(monthly)}
                </p>
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs tracking-wide text-text-muted uppercase">
                Seven-day shape
              </p>
              <div className="flex h-28 items-end gap-2">
                {BAR_WEIGHTS.map((w, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm"
                    style={{
                      height: `${(w / maxBar) * 100}%`,
                      opacity: 0.55 + w * 0.35,
                      background:
                        "linear-gradient(180deg, var(--fire-gold), var(--fire-red))",
                    }}
                    title={`Day ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <p className="text-xs leading-relaxed text-text-muted">
              30-day cumulative at this capital:{" "}
              <span className="text-text-light tabular-nums">{formatUsd(monthly)}</span>.
              Digital asset operations carry risk of loss.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
      <Reveal>
        <p className="section-kicker">Features</p>
        <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
          Built for operators, not spectators.
        </h2>
      </Reveal>
      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-6">
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          return (
            <Reveal key={f.title} className={f.span} delay={i * 70}>
              <article className="bento h-full p-6 md:p-7">
                <Icon className="size-5 text-fire-orange" />
                <h3 className="mt-5 font-display text-xl font-semibold">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">{f.body}</p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section id="benefits" className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <Reveal>
        <p className="section-kicker">Benefits</p>
        <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
          Trust is operational, not ornamental.
        </h2>
      </Reveal>
      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
        {BENEFITS.map((b, i) => {
          const Icon = b.icon;
          return (
            <Reveal key={b.title} delay={i * 70}>
              <article className="panel flex h-full gap-4 rounded-2xl p-6">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-bg-deep">
                  <Icon className="size-5 text-fire-orange" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{b.body}</p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function CtaBand({ onApply }: { onApply: () => void }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <Reveal className="relative overflow-hidden rounded-2xl bg-bg-surface px-6 py-12 text-center md:px-12 md:py-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(60% 80% at 50% 120%, color-mix(in srgb, var(--fire-orange) 28%, transparent), transparent 70%)",
          }}
        />
        <div className="relative">
          <p className="eyebrow">Open a seat</p>
          <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
            The forge is lit. Step in.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-text-muted">
            Remote, disciplined, yield-bearing work on infrastructure that already
            runs. Apply in a minute.
          </p>
          <Button size="lg" className="mt-8 min-w-52" onClick={onApply}>
            Start Earning Today
            <ArrowRight />
          </Button>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-text-light/8 px-4 py-12 md:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="logo-type font-display text-base font-semibold">Base Exchange Pro</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-text-muted">
            Infrastructure for automating and optimizing digital resource flows.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-muted">
          <a href="#how-it-works" className="hover:text-text-light">
            How It Works
          </a>
          <a href="#calculator" className="hover:text-text-light">
            Yield model
          </a>
          <a href="#features" className="hover:text-text-light">
            Features
          </a>
          <a href="#benefits" className="hover:text-text-light">
            Benefits
          </a>
        </nav>
      </div>
      <div className="mx-auto mt-10 max-w-6xl space-y-3 text-xs leading-relaxed text-text-muted">
        <p>© {new Date().getFullYear()} Base Exchange Pro. All rights reserved.</p>
        <p>
          This interface is a demonstration. Yield figures are simulated and do
          not constitute an offer of financial services, investment advice, or a
          solicitation. Digital asset operations carry risk of loss. Past
          performance is not indicative of future results. No funds are collected
          through this page.
        </p>
      </div>
    </footer>
  );
}
