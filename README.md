# 3MTT — School Result Checking Portal

A result-management portal that solves a simple problem: **results are hard to access**. Students sign in and instantly see their published term results; school admins/registrars enter scores and publish them when ready.

Built with **React 18 + TypeScript + Tailwind CSS**, wired for **React Router**, and structured into small, reusable components.

---

## ✨ Features

| Area | What it does |
|---|---|
| **Auth** | Username/password sign-in, session persistence, role-based routing (student vs. admin) |
| **Student dashboard** | Lists every *published* result for the signed-in student as ticket-stub cards |
| **Result view** | A "result slip" page — per-subject scores, grades, class average seal, teacher's comment, printable |
| **Admin console** | Form to enter a student's subject scores, save as draft or publish, plus a table of every record with a publish/unpublish toggle |
| **Records** | Simulated database (`src/data/mockDatabase.ts`) + a service layer (`src/services/`) that mimics real REST endpoints, so swapping in a real backend later only touches one folder |

---

## 🧱 Tech stack

- **React 18** + **TypeScript** (strict mode)
- **Tailwind CSS** — custom "ledger" design tokens (navy/gold/paper palette, Fraunces + Inter + JetBrains Mono type)
- **React Router v6** — client-side routing & route guards
- **Vite** — dev server & build tool
- Data layer: an in-memory mock database backed by `localStorage`, standing in for SQLite/Postgres

No backend server is required to run or demo the app — everything works client-side. See [Swapping in a real backend](#-swapping-in-a-real-backend-sqlitepostgres) below for how to connect one.

---

## 📂 Project structure

```
src/
├── components/
│   ├── Admin/          # AdminUploadForm, StudentRecordsTable
│   ├── Auth/            # LoginForm, ProtectedRoute
│   ├── Layout/           # Navbar, Footer, PageShell
│   ├── Results/          # ResultCard, ResultSummary, ResultTable
│   └── UI/               # Button, Input, Card, Badge, Alert (design system primitives)
├── context/
│   └── AuthContext.tsx   # Global auth state (current user, login, logout)
├── data/
│   └── mockDatabase.ts   # Seed students, users, subjects, results ("the database")
├── hooks/
│   └── useAuth.ts
├── pages/
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx     # student: list of results
│   ├── ResultDetailPage.tsx  # student: one result slip
│   ├── AdminPage.tsx         # admin: enter + publish results
│   └── NotFoundPage.tsx
├── services/
│   ├── authService.ts    # login/logout — the API-shaped functions to swap for real HTTP calls
│   └── resultService.ts  # CRUD for students & results
├── types/
│   └── index.ts           # Student, ResultRecord, SubjectScore, AuthUser, etc.
├── utils/
│   └── gradeUtils.ts       # score → grade (WAEC-style A1–F9 scale), pass/fail, averages
├── App.tsx                 # routes
└── main.tsx                 # entry point
```

Each folder maps to a single responsibility, so components stay small and reusable: `ResultTable` and `ResultSummary` are used only inside `ResultDetailPage`, but `Button`, `Input`, `Card`, `Badge`, and `Alert` are shared across every screen.

---

## 🚀 Getting started

**Prerequisites:** Node.js 18+ and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open the app
# → http://localhost:5173
```

### Demo credentials

| Role | Username | Password |
|---|---|---|
| Student | `amara.chukwu` | `student123` |
| Student | `tunde.bakare` | `student123` |
| Admin | `admin` | `admin123` |

Sign in as **admin** to enter and publish a result, then sign out and sign back in as **amara.chukwu** (or **tunde.bakare**) to see it appear on the student dashboard.

### Build for production

```bash
npm run build     # type-checks and outputs static files to dist/
npm run preview   # serve the production build locally
```

The `dist/` folder is a static site — deploy it to Vercel, Netlify, GitHub Pages, or any static host.

---

## 🔐 How auth works

- `AuthContext` holds the signed-in user and exposes `login()` / `logout()`.
- `authService.login()` checks the username/password against the seeded `USERS` list and stores the session in `localStorage` (key: `ledger.session`).
- `ProtectedRoute` wraps pages that require a session, and can additionally restrict a route to a role (e.g. `/admin` only allows `role: "admin"`).
- This is a **demo auth scheme** — passwords are plaintext in the seed data purely for local testing. Never ship this pattern to production; see below.

## 🎓 How results work

1. **Admin enters scores** for a student, term, and session in `AdminUploadForm`. Each subject score (0–100) is converted to a grade using `scoreToGrade()` (WAEC-style A1/B2/B3/C4/C5/C6/D7/E8/F9 — easy to swap for a 4.0 GPA or letter-only scale in `src/utils/gradeUtils.ts`).
2. The admin chooses **Save as draft** (visible only in the admin console) or **Publish result** (also visible to the student).
3. **Students** only ever see `status: "published"` results on their dashboard (`getResultsForStudent` filters this).
4. Opening a result shows the full slip: the gold "seal" badge with the overall grade and average, a subject-by-subject table, and the teacher's comment. There's a **Print / Save as PDF** button that uses the browser's native print dialog.

---

## 🔌 Swapping in a real backend (SQLite/Postgres)

The whole point of `src/services/` is that components never talk to `mockDatabase.ts` directly — they only call functions like `getResultsForStudent(studentId)` or `createResult(input)`. To connect a real backend:

1. Stand up an API (e.g. Node/Express or Django) with endpoints matching the comments already in `authService.ts` and `resultService.ts` (`POST /api/auth/login`, `GET /api/results?studentId=`, etc.), backed by SQLite or Postgres.
2. Replace the body of each function in `authService.ts` / `resultService.ts` with a `fetch(...)` call to that endpoint — the function **signatures and return types stay the same**, so no component code needs to change.
3. Move password checking and session issuing (e.g. JWTs or HTTP-only cookies) to the server; stop storing credentials or sessions in `localStorage`.

---

## 🎨 Design notes

The visual identity ("Ledger") leans into the idea of a physical school report card: a navy-and-gold "ledger" palette on warm paper, a serif display face (Fraunces) for headings against a monospace face (JetBrains Mono) for grades and data, and a circular gold "seal" badge on the result slip that stamps the term's overall grade — evoking a registrar's signature and stamp on a real transcript.

---

## 🎥 Demo video checklist

When recording the 2–3 minute walkthrough:
1. Sign in as **admin**, enter a result for a subject set, publish it (30s)
2. Show the records table with the publish/unpublish toggle (20s)
3. Sign out, sign in as the **student**, show the dashboard with the new result card (30s)
4. Open the result slip — point out the grade seal, subject table, and comment (30s)
5. Click **Print / Save as PDF** to show export (15s)

---

## 📄 License

MIT — feel free to adapt this for your own school or project.
