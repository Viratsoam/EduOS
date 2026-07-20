# Contributing to EduOS

## Before You Start

Read:

- `README.md`
- `MASTER_PROMPT.md`
- `ARCHITECTURE.md`
- `DATABASE.md`
- `AI.md`
- `API_GUIDELINES.md`
- `CODING_STANDARDS.md`
- `SECURITY.md`

## Workflow

1. Fork or clone the repository.
2. Create a focused branch.
3. Read the related architecture documents.
4. Implement only the requested change.
5. Add or update tests.
6. Update documentation when architecture, APIs, database schema, or AI behavior changes.
7. Open a pull request.

## Branch Names

Examples:

```text
feature/auth-login
feature/course-management
fix/tenant-filter
docs/database-plan
```

## Pull Requests

Pull requests should include:

- Summary
- Files changed
- APIs added
- Database changes
- Tests added
- Screenshots for UI changes
- Security notes for auth, tenant, permission, AI, or upload work

## Code Review

Reviewers should check:

- Tenant isolation
- Permission checks
- Validation
- Error handling
- Test coverage
- Reuse of shared utilities
- Documentation updates

## Issues

Good issues include:

- Problem statement
- Expected behavior
- Current behavior
- Relevant module
- Screenshots or logs where useful
- Acceptance criteria

## Labels

Suggested labels:

- `area:frontend`
- `area:backend`
- `area:ai`
- `area:database`
- `area:security`
- `area:docs`
- `type:bug`
- `type:feature`
- `type:task`
- `priority:high`
