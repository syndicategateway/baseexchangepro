import { useEffect, useId, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Flame, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { OperatorSession } from "@/components/landing/types";

type Mode = "login" | "apply";

export function AccessModal({
  open,
  onOpenChange,
  mode,
  onModeChange,
  onAuthenticated,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: Mode;
  onModeChange: (mode: Mode) => void;
  onAuthenticated: (session: OperatorSession) => void;
}) {
  const titleId = useId();
  const [email, setEmail] = useState("");
  const [secret, setSecret] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [applied, setApplied] = useState(false);
  const firstField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setError("");
      setApplied(false);
      setEmail("");
      setSecret("");
      setName("");
      const t = window.setTimeout(() => firstField.current?.focus(), 40);
      return () => window.clearTimeout(t);
    }
  }, [open, mode]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !secret.trim()) {
      setError("Enter both operator email and access key.");
      return;
    }
    const session: OperatorSession = {
      email: email.trim(),
      name: email.trim().split("@")[0] || "Operator",
    };
    try {
      localStorage.setItem("bep.session", JSON.stringify(session));
    } catch {
      /* ignore quota */
    }
    onAuthenticated(session);
    onOpenChange(false);
  }

  function handleApply(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Name and email are required.");
      return;
    }
    setApplied(true);
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="modal-scrim z-modal-scrim fixed inset-0" />
        <Dialog.Content
          aria-labelledby={titleId}
          className="panel z-modal fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl p-6 md:p-7"
        >
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow mb-2">Base Exchange Pro</p>
              <Dialog.Title id={titleId} className="font-display text-2xl font-semibold">
                {mode === "login" ? "Desk login" : "Open an operator seat"}
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-sm text-text-muted">
                {mode === "login"
                  ? "Demonstration desk — any credentials open a local session."
                  : "Tell the desk who you are. This is a simulated application."}
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" aria-label="Close" className="shrink-0">
                <X />
              </Button>
            </Dialog.Close>
          </div>

          <div className="mb-5 grid grid-cols-2 gap-1 rounded-lg bg-bg-deep p-1">
            <button
              type="button"
              className={cn(
                "h-10 rounded-md text-sm font-medium transition-[background-color,color] duration-150",
                mode === "login"
                  ? "bg-fire-red text-text-light"
                  : "text-text-muted hover:text-text-light",
              )}
              onClick={() => onModeChange("login")}
            >
              Dashboard login
            </button>
            <button
              type="button"
              className={cn(
                "h-10 rounded-md text-sm font-medium transition-[background-color,color] duration-150",
                mode === "apply"
                  ? "bg-fire-red text-text-light"
                  : "text-text-muted hover:text-text-light",
              )}
              onClick={() => onModeChange("apply")}
            >
              Start earning
            </button>
          </div>

          {mode === "login" ? (
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-medium text-text-muted">Operator email</span>
                <input
                  ref={firstField}
                  className="field"
                  type="email"
                  autoComplete="username"
                  placeholder="you@desk.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-medium text-text-muted">Access key</span>
                <input
                  className="field"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                />
              </label>
              {error ? <p className="text-sm text-fire-orange">{error}</p> : null}
              <Button type="submit" size="lg" className="mt-1 w-full">
                <Flame />
                Enter operator desk
              </Button>
            </form>
          ) : applied ? (
            <div className="rounded-lg bg-bg-deep p-5 text-sm leading-relaxed text-text-muted">
              <p className="font-display text-lg text-fire-gold">Application received.</p>
              <p className="mt-2">
                A dedicated manager will review the seat request for{" "}
                <span className="text-text-light">{email}</span>. This is a demonstration —
                no funds are collected.
              </p>
              <Button className="mt-5 w-full" onClick={() => onOpenChange(false)}>
                Return to site
              </Button>
            </div>
          ) : (
            <form onSubmit={handleApply} className="flex flex-col gap-4">
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-medium text-text-muted">Full name</span>
                <input
                  ref={firstField}
                  className="field"
                  type="text"
                  autoComplete="name"
                  placeholder="Alex Rivera"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-medium text-text-muted">Email</span>
                <input
                  className="field"
                  type="email"
                  autoComplete="email"
                  placeholder="you@desk.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              {error ? <p className="text-sm text-fire-orange">{error}</p> : null}
              <Button type="submit" size="lg" variant="gold" className="mt-1 w-full">
                Submit application
              </Button>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
