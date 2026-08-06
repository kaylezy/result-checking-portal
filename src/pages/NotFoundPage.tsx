import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-ledger-slate">Error 404</p>
      <h1 className="font-display text-3xl font-semibold text-ledger-navy">Page not found</h1>
      <Link to="/" className="text-sm font-medium text-ledger-goldDim hover:underline">
        Return home
      </Link>
    </div>
  );
}
