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
- Frontend:
  - cd frontend
  - npm install
  - Dev server: `npm run dev` (Vite)
  - Build: `npm run build`
  - Preview build: `npm run preview`

Run locally (full flow)
- Run MongoDB locally (or point `MONGO_URI` at a hosted DB).
- Start backend (from `backend/`) then start frontend (from `frontend/`).

Tests & lint
- Status: there are no test or lint scripts currently configured in this repo.
- Recommendation: add `jest`/`vitest` for unit tests and `eslint` + `prettier` for lint/formatting. Once added, expose `npm test` and `npm run lint` scripts in each package.

Coding standards
- Formatting: use Prettier (opinionated) and run it on save / pre-commit.
- Linting: use ESLint with the recommended JS/Vue ruleset.
- Naming:
  - JS/Node: `camelCase` for variables & functions, `PascalCase` for classes.
  - Vue components: `PascalCase` for component filenames and component names.
  - Files: use `kebab-case` for non-component filenames (optional but consistent).

PR / commit expectations
- Use small, focused commits. Prefer a single logical change per PR.
- Commit message convention: recommend Conventional Commits (e.g. `feat:`, `fix:`, `chore:`, `docs:`).
- PR checklist (min):
  - Descriptive title and summary
  - Link to related issue (if any)
  - Manual verification steps (how to test locally)
  - Ensure no unrelated files changed

Release process
- No automated release configured. Recommended lightweight process:
  - Follow semantic versioning (tag `vMAJOR.MINOR.PATCH`).
  - Create a GitHub Release for each tag and include changelog notes.
  - Optionally add CI to automate changelog generation and publishing.

Where configs live
- Project-level: `package.json` in `backend/` and `frontend/`.
- Frontend tooling: `frontend/vite.config.js`.
- Repo automation: `.github/` (currently only `dependabot.yml`).

Open questions
- Do you want me to add a basic test runner, ESLint/Prettier config, and a CI workflow (GitHub Actions)? If yes, I can scaffold those next.

---
Generated for maintainers to onboard and run the project quickly. Keep it concise; update as tooling is added.
