# EduOS Coding Standards

## Purpose

This document defines implementation standards for EduOS.

## TypeScript

- Use strict TypeScript.
- Do not use `any`.
- Prefer explicit domain types.
- Prefer discriminated unions for state variants.
- Avoid duplicated types across apps.
- Put shared types in `packages/types`.

## Formatting

- Use Prettier.
- Use ESLint.
- Keep imports ordered by local convention once tooling is added.
- Keep files focused.

## Backend Standards

Use NestJS modules with clear boundaries.

Each module should contain:

- controller
- service
- repository
- dto
- entity
- interfaces
- types
- validators
- constants
- decorators
- guards
- tests

Controllers:

- Parse requests.
- Declare auth and permission requirements.
- Return standard response envelopes.
- Do not contain business logic.

Services:

- Own business workflows.
- Enforce tenant-aware operations.
- Call repositories and other services.
- Emit domain events where needed.

Repositories:

- Own database access.
- Always filter tenant-owned records by `tenant_id`.
- Avoid leaking ORM-specific details across layers.

DTOs:

- Validate every input.
- Never trust client-provided tenant IDs.
- Keep create, update, query, and response DTOs separate when behavior differs.

## Frontend Standards

Use Next.js App Router.

Rules:

- Use Server Components where possible.
- Use Client Components only for interactivity.
- Keep forms accessible.
- Use React Hook Form for non-trivial forms.
- Use TanStack Query for server state.
- Use Zustand for small client-side app state.
- Keep shared UI in `packages/ui`.
- Use responsive layouts from the start.
- Support dark mode.

## AI Standards

- Route all AI calls through the AI Gateway.
- Never call LLM providers directly from frontend code.
- Never answer learner questions from public knowledge unless a future mode explicitly allows it.
- Include citations where educational trust matters.
- Track token usage and latency.

## Error Handling

- Use a global exception filter in the backend.
- Convert known domain errors into consistent API errors.
- Do not expose stack traces to clients.
- Log enough context for debugging without leaking secrets or sensitive content.

## Logging

Logs should include:

- Request ID
- Tenant ID where available
- User ID where available
- Module
- Action
- Error code

Do not log:

- Passwords
- Tokens
- API keys
- Full private documents
- Payment secrets

## Environment Variables

- Validate environment variables at startup.
- Keep examples in `.env.example`.
- Never commit real secrets.
- Prefer typed config access instead of raw `process.env` throughout application code.

## Testing

Use test coverage based on risk.

Required:

- Unit tests for pure utilities and services
- Integration tests for repositories and module flows
- E2E tests for critical user journeys

Security-sensitive code must have tests.

## Commits

Use concise, meaningful commit messages.

Recommended format:

```text
type(scope): summary
```

Examples:

```text
docs(repo): add architecture foundation
feat(auth): add refresh token rotation
fix(ai): enforce tenant filter in retrieval
```
