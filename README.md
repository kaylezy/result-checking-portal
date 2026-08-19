# 3MTT Result Portal

A result-management portal that solves a simple problem: **results are hard to access**. Students sign in and instantly see their
published results; school admins/registrars enter scores and publish them when ready.

A simple web app where **students check their school results** and **admins upload and publish them**.

---

## What this app does

There are two types of users:

### Students

- Sign in with their username and password
- See a list of their **published** results (by term and session)
- Open any result to view subject scores, grades, average, and the teacher's comment
- Print or save the result as a PDF

### Admins

- Sign in with admin credentials
- Enter a student's scores for each subject
- Save the result as a **draft** (students cannot see it yet) or **publish** it (students can see it)
- View all student records in a table and publish or unpublish results anytime

---

## How it works

1. **Login** — Open the app and pick the **Student** or **Admin** tab, then sign in.
2. **Admin uploads results** — The admin enters scores, picks a student and term, then publishes when ready.
3. **Student views results** — The student signs in and only sees results that have been published.
4. **View details** — Click a result to open the full report card, including grades and comments.

Results stay saved in your browser (`localStorage`), so they persist even after you refresh the page.

---

## Getting started

**You need:** Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Then open **http://localhost:5173** in your browser.

To build for production:

```bash
npm run build
```

---

## Demo login details

Use the **Student** or **Admin** tab on the login page, then sign in with:

| Role    | Username       | Password     |
| ------- | -------------- | ------------ |
| Student | `amara.chukwu` | `student123` |
| Student | `tunde.bakare` | `student123` |
| Admin   | `admin`        | `admin123`   |

**Try it:** Sign in as admin, enter and publish a result, then sign out and sign in as a student to see it on their dashboard.

---

## Tech used

React, TypeScript, Tailwind CSS, and React Router — built with Vite.

---

## License

MIT
