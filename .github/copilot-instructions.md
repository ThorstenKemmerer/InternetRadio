# Copilot instructions

Project context
- InternetRadio: a small Vue 3 frontend (Vite) and Express/Mongoose backend serving a list of radio stations.

Preferred languages & tools
- Primary: JavaScript (ES2020+), Vue 3, Node.js.
- Tooling: Vite (frontend), Express + Mongoose (backend), npm.

```instructions
# Copilot instructions

Project context
- InternetRadio: Vue 3 (Vite) frontend + Express + Mongoose backend serving a radio-station list and player.

Preferred languages & tools
- Primary: JavaScript (ES2020+), Vue 3, Node.js
- Tooling: Vite, Express, Mongoose, npm

Code style
- Follow ESLint + Prettier (not yet added). Keep changes small and focused.
- JS: `camelCase` for variables/functions, `PascalCase` for classes and Vue components. Non-component filenames: `kebab-case`.

Quick dev commands
- Frontend dev: `cd frontend && npm install && npm run dev`
- Backend dev: `cd backend && npm install && npm run dev`
- Backend standalone: `cd backend && npm run start:standalone`
- Seed sample data: `cd backend && npm run seed`

Tests & lint
- Status: no test runner or lint scripts yet. Recommended: add `vitest` or `jest`, and `eslint` + `prettier`.

Branching & commits
- Branches: `feature/short-description`, `fix/short-description`, `chore/short-desc`
- Commits: use Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`)

PR expectations
- Small, focused PRs with a clear title and manual verification steps.
- Include related issue link and list of changed files.

Agent / Copilot rules
- Do:
  - Propose concise, self-contained changes that follow the project's style.
  - Include tests or manual verification steps when behavior changes.
  - Prefer existing dependencies and patterns in the repo.
  - When a change affects multiple areas, create a short plan and track it with `manage_todo_list`.

- Don't:
  - Add large features or new dependencies without maintainer approval.
  - Commit secrets, credentials, or environment values.
  - Make wide refactors or modify unrelated files silently.

Editing & automation guidance
- Use `apply_patch` to edit files. Keep patches minimal and focused.
- Run local dev servers to verify changes (`npm run dev` in each package).
- When adding tests or linters, expose `npm test` and `npm run lint` scripts.

Where to look
- Backend: `backend/` (server, models, routes, `seed.js`)
- Frontend: `frontend/` (Vite + Vue app, `src/components`)

Next steps suggestions
- Offer to scaffold ESLint/Prettier, `vitest` config, and a simple GitHub Actions CI workflow if requested.

Keep this file brief and update as tooling is added.
```