import type { AuthUser, LoginCredentials } from "@/types";
import { USERS } from "@/data/mockDatabase";

const SESSION_KEY = "ledger.session";
const NETWORK_DELAY_MS = 400;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), NETWORK_DELAY_MS));
}

/**
 * Simulates POST /api/auth/login.
 * Swap the body of this function for a real `fetch("/api/auth/login", ...)`
 * call when you connect a real backend — the return type stays the same.
 */
export async function login(credentials: LoginCredentials): Promise<AuthUser> {
  const match = USERS.find(
    (u) => u.username.toLowerCase() === credentials.username.trim().toLowerCase()
  );

  if (!match || match.password !== credentials.password) {
    await delay(null);
    throw new Error("Invalid username or password.");
  }

  const { password: _password, ...user } = match;
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return delay(user);
}

export async function logout(): Promise<void> {
  localStorage.removeItem(SESSION_KEY);
  return delay(undefined);
}

export function getStoredSession(): AuthUser | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}
