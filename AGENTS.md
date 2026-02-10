# AGENT.md

What this repo is
- InternetRadio: simple Vue frontend + Express/Mongo backend serving a radio-station list and player.

Dev environment (quick)
- Prereqs: Node.js (16+), npm, MongoDB (for backend data).
- Backend:
  - cd backend
  - npm install
  - create `.env` with your MongoDB connection (e.g. `MONGO_URI`)
  - Dev server: `npm run dev` (uses `nodemon`)
  - Start (production-ish): `npm start` or `npm run start:standalone`
  - Seed sample data: `npm run seed`
# AGENT.md

Purpose
- Short guide for contributors and automated agents working on this repository.

Quick dev commands
- Backend dev: `cd backend && npm install && npm run dev`
- Backend standalone: `cd backend && npm run start:standalone`
- Seed data: `cd backend && npm run seed`
- Frontend dev: `cd frontend && npm install && npm run dev`

Conventions
- Commits: use Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`).
- PRs: small, focused, include manual verification steps and related issue reference.

Agent / automation instructions
- When an agent (human or automated) starts work, create a short plan and track progress using the `manage_todo_list` tool.
- Keep changes minimal and focused; avoid unrelated file modifications.
- Use `apply_patch` for edits and run local dev servers to verify changes when possible.

Testing & linting
- No test runner is configured yet. Recommended additions: `vitest` or `jest` for tests and `eslint` + `prettier` for formatting/linting.

Where to look
- Backend: `backend/` — server, models, routes, and `seed.js`.
- Frontend: `frontend/` — Vite + Vue app and components.

Next steps suggestions
- Add basic linting and formatting (ESLint + Prettier) and a lightweight test setup (`vitest`).
- Optionally add a GitHub Actions workflow for CI.

Keep this file updated as tooling is added.
