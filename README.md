# jobapplicationnext.js

AI job application project built with Next.js (App Router) and TypeScript.

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
├── app/             # Routes, layouts, pages, and API route handlers (App Router)
│   └── api/         # Backend endpoints (route.ts files)
├── components/
│   ├── ui/          # Generic, reusable UI building blocks (Button, Input, ...)
│   └── layout/      # Page structure components (Container, Header, ...)
├── config/          # Typed access to environment variables and app config
├── constants/       # App-wide constant values (routes, names, limits)
├── hooks/           # Reusable React hooks (useXxx)
├── lib/
│   └── api/         # API client, error class, and response helpers
├── services/        # Domain/data-access functions that call the API client
├── types/           # Shared TypeScript types
└── utils/           # Small, pure helper functions
```

## Conventions

- **Files and folders:** kebab-case (`api-client.ts`, `user-profile/`).
- **Components:** PascalCase exports (`export function UserCard`), one component per file.
- **Hooks:** `use-xxx.ts` files exporting `useXxx`.
- **Styles:** CSS Modules colocated with the component (`button.module.css`).
- **Imports:** use the `@/` alias for `src/` (`import { Button } from "@/components/ui"`).
- **Barrel files:** each shared folder exposes its public API through `index.ts`.
- **Data flow:** UI → `services/` → `lib/api/api-client` → `app/api/*` route handlers.
- **Feature-only code:** colocate it inside the route folder using private folders (`app/jobs/_components/`).
