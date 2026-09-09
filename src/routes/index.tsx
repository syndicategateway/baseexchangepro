import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AccessModal } from "@/components/landing/access-modal";
import { LandingPage } from "@/components/landing/landing-page";
import { OperatorConsole } from "@/components/landing/operator-console";
import type { OperatorSession } from "@/components/landing/types";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [session, setSession] = useState<OperatorSession | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [accessMode, setAccessMode] = useState<"login" | "apply">("login");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("bep.session");
      if (!raw) return;
      const parsed = JSON.parse(raw) as OperatorSession;
      if (parsed?.email && parsed?.name) setSession(parsed);
    } catch {
      /* ignore */
    }
  }, []);

  function openLogin() {
    setAccessMode("login");
    setLoginOpen(true);
  }

  function openApply() {
    setAccessMode("apply");
    setLoginOpen(true);
  }

  return (
    <>
      {session ? (
        <OperatorConsole session={session} onLogout={() => setSession(null)} />
      ) : (
        <LandingPage onLogin={openLogin} onApply={openApply} />
      )}
      <AccessModal
        open={loginOpen}
        onOpenChange={setLoginOpen}
        mode={accessMode}
        onModeChange={setAccessMode}
        onAuthenticated={(next) => {
          setLoginOpen(false);
          setSession(next);
        }}
      />
    </>
  );
}
