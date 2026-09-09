import { Activity, Landmark, LogOut, ShieldCheck, TrendingUp, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatUsd } from "@/lib/utils";
import type { OperatorSession } from "@/components/landing/types";

const RAILS = [
  { bank: "DBS Singapore", status: "Live", currency: "USD" },
  { bank: "Revolut Europe", status: "Live", currency: "EUR" },
  { bank: "Wise UK", status: "Review", currency: "GBP" },
  { bank: "Bank of Georgia", status: "Live", currency: "GEL" },
];

const FLOWS = [
  { id: "OP-1842", rail: "DBS · USD", amount: 12840, yield: 96.3, age: "2m" },
  { id: "OP-1841", rail: "Revolut · EUR", amount: 6200, yield: 46.5, age: "11m" },
  { id: "OP-1840", rail: "Wise · GBP", amount: 4100, yield: 30.75, age: "24m" },
  { id: "OP-1839", rail: "BoG · GEL", amount: 2750, yield: 20.62, age: "41m" },
  { id: "OP-1838", rail: "DBS · USD", amount: 9800, yield: 73.5, age: "1h" },
];

export function OperatorConsole({
  session,
  onLogout,
}: {
  session: OperatorSession;
  onLogout: () => void;
}) {
  function logout() {
    try {
      localStorage.removeItem("bep.session");
    } catch {
      /* ignore */
    }
    onLogout();
  }

  return (
    <div className="page-shell min-h-dvh bg-bg-deep">
      <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-fire-red/40 bg-bg-deep/80 px-4 py-3 backdrop-blur-xl md:px-8">
        <div>
          <p className="font-display text-lg font-semibold tracking-tight">
            <span className="logo-type">Base Exchange Pro</span>
          </p>
          <p className="text-xs text-text-muted">
            Operator desk · {session.email}
          </p>
        </div>
        <Button variant="outline" onClick={logout} className="pl-4 pr-3.5">
          <LogOut />
          Sign out
        </Button>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-10">
        <p className="eyebrow">Live session</p>
        <h1 className="mt-2 font-display text-3xl font-semibold md:text-4xl">
          Welcome back, {session.name}
        </h1>
        <p className="mt-2 max-w-xl text-sm text-text-muted">
          Demonstration console. Figures are simulated and stored only in this
          browser. No live rails are connected.
        </p>

        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat icon={Wallet} label="Vault balance" value={formatUsd(12450)} />
          <Stat icon={TrendingUp} label="Yield · 24h" value={formatUsd(93.38)} gold />
          <Stat icon={Landmark} label="Active rails" value="3 / 4" />
          <Stat icon={ShieldCheck} label="Desk uptime" value="99.98%" />
        </section>

        <section className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-5">
          <article className="panel rounded-2xl p-5 lg:col-span-3">
            <div className="mb-4 flex items-center gap-2">
              <Activity className="size-4 text-fire-orange" />
              <h2 className="font-display text-lg font-semibold">Recent flows</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[28rem] text-left text-sm">
                <thead className="text-xs tracking-wide text-text-muted uppercase">
                  <tr>
                    <th className="pb-3 font-medium">ID</th>
                    <th className="pb-3 font-medium">Rail</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Yield</th>
                    <th className="pb-3 font-medium">Age</th>
                  </tr>
                </thead>
                <tbody>
                  {FLOWS.map((row) => (
                    <tr key={row.id} className="border-t border-text-light/8">
                      <td className="py-3 font-medium tabular-nums">{row.id}</td>
                      <td className="py-3 text-text-muted">{row.rail}</td>
                      <td className="py-3 tabular-nums">{formatUsd(row.amount, 0)}</td>
                      <td className="py-3 tabular-nums text-fire-gold">
                        +{formatUsd(row.yield)}
                      </td>
                      <td className="py-3 text-text-muted">{row.age}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="panel rounded-2xl p-5 lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <Landmark className="size-4 text-fire-orange" />
              <h2 className="font-display text-lg font-semibold">Bank rails</h2>
            </div>
            <ul className="flex flex-col gap-3">
              {RAILS.map((rail) => (
                <li
                  key={rail.bank}
                  className="flex items-center justify-between rounded-lg bg-bg-deep px-3 py-3"
                >
                  <div>
                    <p className="text-sm font-medium">{rail.bank}</p>
                    <p className="text-xs text-text-muted">{rail.currency}</p>
                  </div>
                  <span
                    className={
                      rail.status === "Live"
                        ? "text-xs font-medium text-fire-gold"
                        : "text-xs font-medium text-text-muted"
                    }
                  >
                    {rail.status}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        </section>
      </main>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  gold,
}: {
  icon: typeof Wallet;
  label: string;
  value: string;
  gold?: boolean;
}) {
  return (
    <article className="panel rounded-2xl p-5">
      <Icon className="size-4 text-fire-orange" />
      <p className="mt-3 text-xs tracking-wide text-text-muted uppercase">{label}</p>
      <p
        className={
          gold
            ? "mt-1 font-display text-2xl font-semibold text-fire-gold tabular-nums"
            : "mt-1 font-display text-2xl font-semibold tabular-nums"
        }
      >
        {value}
      </p>
    </article>
  );
}
