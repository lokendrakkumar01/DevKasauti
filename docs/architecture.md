# Architecture notes

## Phase 1 boundary

DevKasauti starts as an npm-workspaces monorepo with a React/Vite browser app, an Express modular monolith, and a separately deployable worker placeholder. The browser talks to the API over HTTP. Feature modules own their routes and, in later phases, their service and persistence boundaries.

## Why this shape

- Keep local setup and changes manageable for one developer.
- Keep HTTP handling separate from asynchronous review and assessment jobs.
- Introduce MongoDB, Redis, GitHub, and AI provider clients only when their workflows are being built; this avoids credentials and infrastructure that Phase 1 cannot use.
- Keep one deployable API until real scale or team boundaries justify splitting services.

## API conventions

Successful responses use `{ success: true, data }`. Errors use `{ success: false, error: { code, message } }`. Health check: `GET /api/health`.

## Trust boundaries

All browser input and submitted repository content are untrusted. The app server must not execute student code. External credentials stay server-side, and future webhook routes must verify provider signatures before accepting events.
