# Copilot instructions

Project context
- InternetRadio: a small Vue 3 frontend (Vite) and Express/Mongoose backend serving a list of radio stations.

Preferred languages & tools
- Primary: JavaScript (ES2020+), Vue 3, Node.js.
- Tooling: Vite (frontend), Express + Mongoose (backend), npm.

Code style
- Follow ESLint + Prettier conventions (not yet included). Keep code small and focused.
- JS style: `camelCase` for vars/funcs, `PascalCase` for classes and Vue components, kebab-case allowed for non-component filenames.

Testing commands (repo-specific TODOs)
- Frontend dev: `cd frontend && npm run dev`
- Backend dev: `cd backend && npm run dev`
- Tests: TODO (no test runner configured yet — please add `npm test`/`npm run test`)
- Lint: TODO (add `npm run lint` after ESLint is added)

Branch & commit naming
- Branches: `feature/short-description`, `fix/short-description`, `chore/short-desc`.
- Commits: follow Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`). Keep messages clear and reference issue IDs when present.

PR expectations
- Small, focused PRs with a descriptive title and summary.
- Include manual test steps and any setup required (env vars, DB seed).
- Link related issue and list files changed. Address review comments promptly.

Do / Don't rules for Copilot suggestions
- Do:
  - Suggest concise, self-contained changes that follow the project's style.
  - Offer tests or instructions when changing behavior.
  - Prefer using existing project dependencies and patterns.
- Don't:
  - Add large features or new dependencies without maintainer approval.
  - Introduce secrets, credentials, or environment values in code.
  - Modify unrelated files or rewrite the repo layout silently.

If you'd like, I can scaffold ESLint/Prettier, a basic test runner, and a CI workflow next — say the word.