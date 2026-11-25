# DevKasauti

**Don't just show your skills. Prove them.**

DevKasauti is a proof-based developer skill and hiring platform. This repository is the Phase 1 foundation: a Vite React web app, a modular Express API, and an architecture prepared for a separate background worker.

## Phase 1 architecture

```text
Browser (React + Vite, :5173)
        │ HTTP /api (Axios; development origin allowed explicitly)
        ▼
Express modular monolith (:4000)
  config · middleware · modules · shared response/error conventions
        │ later phases
        ├── MongoDB / Mongoose for product data
        ├── Redis + BullMQ for async jobs
        ├── GitHub OAuth, Octokit and signed webhooks
        └── LLM provider behind a structured-output service

Background worker (separate process, same codebase)
  later: BullMQ consumers for review, Viva and notifications
```

### Decisions

- **One npm-workspaces repo:** the solo developer can run and version the web app and API together. The worker can become an independently started process without splitting the domain into premature microservices.
- **JavaScript with ES modules:** keeps the first learning steps focused on MERN and avoids a second TypeScript build setup. Add types when the domain stabilizes.
- **React + Vite:** quick local feedback and a small client build. React Router, Axios and Lucide are included for the planned web app.
- **Tailwind CSS v4 through its Vite plugin:** the CSS-first integration avoids a separate PostCSS config. `src/styles.css` starts the dark visual tokens and reusable page treatment.
- **Express modular monolith:** route and middleware folders provide clear boundaries while deployment stays simple. MongoDB, auth, queues and external integrations arrive in their relevant phases.
- **Worker is a separate runtime, not a microservice:** CPU/network-heavy reviews should not block HTTP requests; BullMQ and Redis are intentionally not connected until the job workflow is designed.
- **No payment or AI credentials in Phase 1:** secrets belong in local ignored `.env` files and are introduced only when needed.

## Folder structure

```text
DevKasauti/
├── apps/
│   ├── api/
│   │   └── src/
│   │       ├── config/       # Environment/config validation
│   │       ├── middleware/   # Shared HTTP concerns and errors
│   │       └── modules/      # Feature modules; health is the Phase 1 example
│   ├── web/
│   │   └── src/
│   │       ├── lib/          # Axios API client
│   │       ├── components/   # Reusable UI (add as screens are built)
│   │       └── pages/        # Route-level UI (add with public pages)
│   └── worker/               # Reserved for the separate BullMQ process
├── docs/                     # Architecture and operating notes
├── .env.example
├── .gitignore
└── package.json              # Workspace and common commands
```

The `components`, `pages`, `worker`, and `docs` directories are reserved extension points, not claims that those product features already work.

## Windows setup

Install the current Node.js LTS release (npm is bundled), then open PowerShell in the repository:

```powershell
Copy-Item .env.example .env
npm install
npm run dev
```

Open `http://localhost:5173`. The footer reports whether the web app can reach the API. Confirm the API directly at `http://localhost:4000/api/health`; it should return JSON with `success: true` and `data.status: "ok"`.

To run one process on its own:

```powershell
npm run dev:api
npm run dev:web
```

Create `.env` from `.env.example` for local configuration. Never commit `.env` or put credentials in `VITE_*` variables: Vite exposes those values in browser code. `VITE_API_BASE_URL` is only for a public API URL.

## Environment

| Variable | Used by | Default | Purpose |
| --- | --- | --- | --- |
| `NODE_ENV` | API | `development` | Runtime mode |
| `API_PORT` | API | `4000` | HTTP server port |
| `WEB_ORIGIN` | API | `http://localhost:5173` | Exact browser origin allowed by CORS |
| `VITE_API_BASE_URL` | Web | `http://localhost:4000/api` | Public API base URL |

## Design system foundation

The first screen applies the requested palette: `#080B16` page, `#0D1222`/`#111827` surfaces, indigo `#6366F1`, violet `#8B5CF6`, cyan `#22D3EE`, slate text. It uses restrained gradients, fine borders, responsive layout, visible focus-friendly native links, hover feedback, and reduced-motion support. Design tokens and components can be formalized as pages are added.

## Phase boundary

The health route and starter UI are real. Database schemas, account flows, GitHub access, review/Viva, recruiter/college features, worker queues, and payments have not been implemented in this phase. No sample candidate metrics in the illustration are connected to API data; replace that visual with live authenticated data when the dashboard phase begins.
