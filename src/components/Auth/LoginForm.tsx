import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/Button";
import { Alert } from "@/components/UI/Alert";
import type { UserRole } from "@/types";

interface LoginFormProps {
  role: UserRole;
}

const DEMO_CREDENTIALS: Record<UserRole, { username: string; password: string }> = {
  student: { username: "amara.chukwu", password: "student123" },
  admin: { username: "admin", password: "admin123" },
};

export function LoginForm({ role }: LoginFormProps) {
  const { login, logout, error, isLoading } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [roleError, setRoleError] = useState<string | null>(null);

  const demo = DEMO_CREDENTIALS[role];
  const roleLabel = role === "admin" ? "Admin" : "Student";

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setRoleError(null);

    try {
      const user = await login({ username, password });

      if (user.role !== role) {
        const otherRole = role === "admin" ? "Student" : "Admin";
        await logout();
        setRoleError(`These credentials belong to a ${otherRole} account. Switch to the ${otherRole} tab to sign in.`);
        return;
      }

      navigate(user.role === "admin" ? "/admin" : "/dashboard");
    } catch {
      // error already surfaced via context state
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {(error || roleError) && <Alert tone="error">{roleError ?? error}</Alert>}

      <p className="font-mono text-xs uppercase tracking-widest text-ledger-slate">
        Sign in as {roleLabel}
      </p>

      <Input
        label="Username"
        name="username"
        autoComplete="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder={role === "student" ? "e.g. amara.chukwu" : "e.g. admin"}
        required
      />
      <Input
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        required
      />

      <Button type="submit" isLoading={isLoading} className="mt-2 w-full">
        Sign in as {roleLabel}
      </Button>

      <div className="rounded-sm border border-dashed border-ledger-navy/20 bg-ledger-paperDim px-4 py-3 font-mono text-xs text-ledger-slate">
        <p className="mb-1 font-semibold text-ledger-navy">Demo {roleLabel} credentials</p>
        <p>
          {demo.username} / {demo.password}
        </p>
      </div>
    </form>
  );
}
