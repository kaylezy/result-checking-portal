import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/UI/Button";

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="border-b border-ledger-navy/10 bg-ledger-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-10 w-14 items-center justify-center rounded-full border-2 border-ledger-gold font-display text-sm font-semibold text-ledger-navy">
            3MTT
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-ledger-navy">
            Ledger
          </span>
          <span className="hidden font-mono text-[11px] uppercase tracking-widest text-ledger-slate sm:inline">
            Result Portal
          </span>
        </Link>

        {user && (
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-ledger-navy">{user.displayName}</p>
              <p className="font-mono text-[11px] uppercase tracking-widest text-ledger-slate">
                {user.role}
              </p>
            </div>
            <Button variant="ghost" onClick={handleLogout}>
              Sign out
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
