# AI Job Application Assistant

An AI-powered recruitment & job application platform for fresh graduates, recruiters and admins. Built with Next.js (App Router) and TypeScript.

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. A health check endpoint is available at `/api/health`.

## Scripts

| Script              | Purpose                          |
| ------------------- | -------------------------------- |
| `npm run dev`       | Start the dev server (Turbopack) |
| `npm run build`     | Production build                 |
| `npm run start`     | Run the production build         |
| `npm run lint`      | Lint with ESLint                 |
| `npm run typecheck` | Type-check with TypeScript       |

## Project structure

```
src/
├── app/                    # Routes (App Router)
│   ├── page.tsx            # Public landing page
│   ├── (auth)/             # Login & registration (route group, shared split layout)
│   ├── seeker/             # Job Seeker panel
│   ├── recruiter/          # Recruiter (HR) panel
│   ├── admin/              # Admin panel
│   └── api/                # Backend endpoints (route.ts files)
├── components/
│   ├── ui/                 # Generic design-system components (Button, Card, DataTable, Icon, ...)
│   ├── layout/             # App shell (sidebar + top bar), public header/footer, brand
│   └── features/           # Domain components grouped by area (landing, auth, seeker, recruiter, admin, jobs, applications)
├── config/                 # Typed access to environment variables
├── constants/              # Routes, sidebar navigation per role, landing copy
├── hooks/                  # Reusable React hooks (useXxx)
├── lib/api/                # API client, error class, response helpers
├── mocks/                  # Static mock data used by the UI (no backend yet)
├── services/               # Data-access functions that call the API client
├── types/                  # Shared TypeScript types (domain models, API shapes)
└── utils/                  # Small, pure helper functions
```

## UI notes

- **UI only:** every screen reads from `src/mocks/`; buttons and forms use local state. No backend, auth or persistence yet.
- **Roles:** Job Seeker (blue), Recruiter (green) and Admin (purple) share one `AppShell`; each role's menu lives in `src/constants/navigation.ts`.
- **Styling:** CSS Modules + design tokens in `src/app/globals.css`. Light theme only. No UI libraries — icons are inline SVGs in `src/components/ui/icon.tsx`.

## Conventions

- **Files and folders:** kebab-case (`api-client.ts`, `user-profile/`).
- **Components:** PascalCase exports (`export function UserCard`), one component per file.
- **Hooks:** `use-xxx.ts` files exporting `useXxx`.
- **Styles:** CSS Modules colocated with the component (`button.module.css`).
- **Imports:** use the `@/` alias for `src/` (`import { Button } from "@/components/ui"`).
- **Barrel files:** each shared folder exposes its public API through `index.ts`.
- **Data flow:** UI → `services/` → `lib/api/api-client` → `app/api/*` route handlers.
- **Feature-only code:** colocate it inside the route folder using private folders (`app/jobs/_components/`).
