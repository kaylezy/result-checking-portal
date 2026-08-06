import type { ReactNode } from "react";
import { Navbar } from "@/components/Layout/Navbar";
import { Footer } from "@/components/Layout/Footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col paper-texture">
      <Navbar />
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">{children}</main>
      <Footer />
    </div>
  );
}
