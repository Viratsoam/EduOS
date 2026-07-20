# EduOS Security

## Purpose

EduOS handles educational records, learner activity, private organization content, assessments, payments, and AI conversations. Security is a product requirement, not an implementation detail.

## Authentication

Required:

- Secure password hashing
- JWT access tokens
- Refresh token rotation
- Session revocation
- Password reset flow
- OAuth2 support
- Account verification where needed

## Authorization

Use permission-based authorization.

Rules:

- Do not hardcode role names as security checks.
- Declare permissions at route or handler level.
- Check tenant membership before permissions.
- Audit sensitive permission changes.

## Tenant Isolation

Tenant isolation is mandatory.

Rules:

- Tenant-owned tables must include `tenant_id`.
- Tenant context must be resolved before repository access.
- Queries must filter by tenant.
- Cross-tenant admin actions must be explicit and audited.

## Secrets

Never commit:

- API keys
- OAuth secrets
- JWT secrets
- Database passwords
- Provider tokens
- Private certificates

Use `.env.example` for names only.

## Data Protection

Protect:

- Student records
- Parent records
- Teacher records
- Uploaded files
- Assignments
- Exam answers
- AI conversations
- Payment metadata

Do not log sensitive payloads.

## File Uploads

File upload handling must include:

- MIME validation
- Size limits
- Tenant-scoped storage keys
- Virus scanning hook
- Signed URL access
- Permission checks
- Audit logging for sensitive files

## AI Security

AI must enforce:

- Tenant-scoped retrieval
- Approved-source-only answers
- Prompt injection resistance
- No hidden prompt disclosure
- No cross-tenant context leakage
- Usage logging

Treat uploaded documents as untrusted input.

## Web Security

Use:

- Helmet
- CORS allowlist
- CSRF protection where applicable
- Rate limiting
- Secure cookies where cookies are used
- Input validation
- Output encoding

Defend against:

- SQL injection
- XSS
- CSRF
- IDOR
- Broken access control
- File upload abuse
- Prompt injection

## Audit Logs

Audit:

- Login events
- Failed login attempts
- Permission changes
- Role changes
- User invitations
- Course publishing
- Exam publishing
- Payment events
- Sensitive file access
- AI policy refusals

Audit logs should be append-only.

## Reporting

Do not disclose security vulnerabilities publicly before maintainers have time to respond.

Open a private security report when GitHub security advisories are configured. Until then, contact the maintainers directly.
