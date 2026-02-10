Tailwind Integration Plan

Scope: Full migration — add Tailwind, create config files, add a global CSS entry at frontend/src/assets/tailwind.css, import it from frontend/src/main.js, then migrate component styles to Tailwind utilities.

Steps

1. Install dependencies
   - From `frontend/`: `npm install -D tailwindcss postcss autoprefixer`
   - Optionally: `npx tailwindcss init -p` to scaffold configs

2. Add config files (frontend/)
   - `tailwind.config.cjs` with `content`:
     - `./index.html`
     - `./src/**/*.{vue,js,ts,jsx,tsx}`
   - `postcss.config.cjs` exporting `tailwindcss` and `autoprefixer` plugins

3. Add global CSS entry
   - Create `frontend/src/assets/tailwind.css` containing:
     - `@tailwind base;`
     - `@tailwind components;`
     - `@tailwind utilities;`
   - Migrate any global rules from `frontend/src/App.vue` into this file where appropriate.

4. Import global CSS
   - Edit `frontend/src/main.js` to add:
     - `import './assets/tailwind.css'` (before `createApp(App)`)

5. Migrate components (full migration)
   - Update templates to use Tailwind utilities and remove/simplify scoped styles.
   - Files to migrate:
     - `frontend/src/App.vue` — move global styles and apply Tailwind classes to layout/wrappers
     - `frontend/src/components/RadioPlayer.vue` — convert player UI (buttons, sliders)
     - `frontend/src/components/StationList.vue` — convert list/grid, cards, badges, filters

6. Review Vite config
   - `frontend/vite.config.js` usually requires no change; verify PostCSS is applied automatically.

7. Polish and theme
   - Extend `tailwind.config.cjs` theme (colors, spacing) as needed
   - Add utility classes for consistent spacing, rounded corners, shadows

8. Verification
   - Run dev server in `frontend/`:

```bash
cd frontend
npm install --save-dev tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm run dev
```

   - Check layout and responsive behavior; reconcile any conflicts with legacy CSS.

Files to add/modify

- Modify: `frontend/package.json` (add devDependencies)
- Add: `frontend/tailwind.config.cjs`
- Add: `frontend/postcss.config.cjs`
- Add: `frontend/src/assets/tailwind.css`
- Edit: `frontend/src/main.js` (import CSS)
- Edit/migrate: `frontend/src/App.vue`
- Edit/migrate: `frontend/src/components/RadioPlayer.vue`
- Edit/migrate: `frontend/src/components/StationList.vue`
- Optional: review `frontend/vite.config.js` and `frontend/index.html`

Notes & decisions

- Global CSS path chosen: `frontend/src/assets/tailwind.css`
- Integration scope chosen: Full migration to Tailwind utilities
- Use `npx tailwindcss init -p` to scaffold `tailwind.config.cjs` and `postcss.config.cjs` quickly
- Be careful migrating rules from `App.vue` — remove or refactor conflicting selectors after utilities are in place

Next actions I can take

- Produce a focused patch adding the config files and CSS import (no package installs). Then run the frontend dev server to verify.
- Or run the installs and apply code migrations automatically (I can proceed if you authorize install/runtime steps).

Which would you like me to do next?
