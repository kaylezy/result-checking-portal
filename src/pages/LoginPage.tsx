import { useState } from "react";
import { Card } from "@/components/UI/Card";
import { LoginForm } from "@/components/Auth/LoginForm";
import type { UserRole } from "@/types";

const LOGIN_TABS: { role: UserRole; label: string }[] = [
  { role: "student", label: "Student" },
  { role: "admin", label: "Admin" },
];

export function LoginPage() {
  const [activeRole, setActiveRole] = useState<UserRole>("student");

  return (
    <div className="flex min-h-screen items-center justify-center bg-ledger-navy px-6 paper-texture">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <span className="mx-auto flex h-10 w-16 items-center justify-center rounded-full border-2 border-ledger-gold font-display text-xl font-semibold text-ledger-paper">
            3MTT
          </span>
          <h1 className="mt-4 font-display text-3xl font-semibold text-ledger-paper">3MTT Ledger</h1>
          <p className="mt-1 font-mono text-xs uppercase tracking-widest text-ledger-paper/60">
            Result Checking Portal
          </p>
        </div>

        <Card className="overflow-hidden">
          <div
            role="tablist"
            aria-label="Login type"
            className="grid grid-cols-2 border-b border-ledger-navy/10 bg-ledger-paperDim"
          >
            {LOGIN_TABS.map(({ role, label }) => {
              const isActive = activeRole === role;
              return (
                <button
                  key={role}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveRole(role)}
                  className={`px-4 py-3 font-body text-sm font-semibold tracking-wide transition-colors ${
                    isActive
                      ? "border-b-2 border-ledger-gold bg-white text-ledger-navy"
                      : "text-ledger-slate hover:bg-white/60 hover:text-ledger-navy"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="p-8">
            <LoginForm key={activeRole} role={activeRole} />
          </div>
        </Card>
      </div>
    </div>
  );
}
