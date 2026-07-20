# EduOS Master Prompt

## Project

Project name: EduOS, the Education Operating System.

Mission: build the world's first AI-native Education Operating System where schools, universities, coaching institutes, tutors, organizations, and enterprises can manage their educational ecosystem while giving every learner a personalized AI tutor trained only on approved educational content.

EduOS is not another LMS. EduOS is not another YouTube. EduOS is not another Udemy. EduOS is an AI-first, multi-tenant SaaS platform that combines learning management, institution management, AI learning, analytics, collaboration, live classes, and integrations into one platform.

The system must be modular, scalable, production-ready, and enterprise-grade.

## Core Principles

1. AI first
2. Multi-tenant
3. API first
4. Security first
5. Modular architecture
6. Clean architecture
7. SOLID principles
8. DRY
9. Reusable components
10. Enterprise ready

## Tech Stack

Frontend:

- Next.js 15
- TypeScript
- App Router
- TailwindCSS
- Shadcn UI
- React Hook Form
- TanStack Query
- Zustand
- Socket.io Client

Backend:

- NestJS
- TypeScript
- REST APIs
- WebSocket Gateway
- BullMQ
- JWT
- OAuth2
- Passport
- Swagger
- OpenAPI

Database and infrastructure:

- PostgreSQL as the primary database
- Redis for cache and queues
- OpenSearch for search and RAG retrieval
- MinIO for development object storage
- Amazon S3 for production object storage
- Docker and Docker Compose
- GitHub Actions

AI:

- OpenAI
- Gemini
- AWS Bedrock later
- Provider abstraction from day one

## Repository Architecture

Use this repository shape:

```text
apps/
  web/
  backend/
  ai-worker/

packages/
  ui/
  shared/
  sdk/
  types/
  config/
  prompts/

infra/
  docker/
  scripts/

docs/
```

## Multi-Tenancy

Every organization is isolated.

Hierarchy:

```text
Organization
  Departments
    Courses
      Batches
        Subjects
          Lessons
            Students
```

Every tenant-owned table must include `tenant_id` where applicable.

Never build features that can leak data across tenants. Tenant resolution must happen before repository queries. Tenant context must be explicit in backend services.

## RBAC

Use permission-based RBAC, not hardcoded role checks.

Default roles:

- Platform Owner
- Organization Owner
- Admin
- Teacher
- Assistant Teacher
- Student
- Parent
- Guest

Example permissions:

- `course.create`
- `course.edit`
- `course.delete`
- `lesson.publish`
- `student.edit`
- `student.view`
- `attendance.mark`
- `assignment.review`
- `analytics.view`
- `billing.manage`

Everything sensitive must be permission driven.

## Core Modules

- Authentication
- Organizations
- Users
- Permissions
- Courses
- Lessons
- Subjects
- Batches
- Attendance
- Assignments
- Exams
- Certificates
- Chat
- Notifications
- Integrations
- Analytics
- Search
- AI
- Payments
- Media
- Settings

## AI Rules

AI must never answer using public internet knowledge for learner-facing educational answers.

AI answers only from approved content:

- Uploaded PDFs
- Teacher notes
- Slides
- Lecture transcripts
- Assignments
- Course material
- Books uploaded by the organization
- Lesson metadata

The required AI pipeline:

```text
Prompt Builder
  -> RAG
  -> OpenSearch
  -> LLM
  -> Response Validation
  -> Response
```

Never send entire documents to an LLM. Retrieve only relevant chunks. Include citations and provenance wherever learner trust matters.

## AI Features

- AI Tutor
- AI Notes
- AI Summary
- AI Flashcards
- AI Quiz Generator
- AI Homework Checker
- AI Assignment Review
- AI Exam Generator
- AI Study Planner
- AI Doubt Solver
- AI Revision Notes
- AI Weakness Detection
- AI Learning Memory
- AI Teacher Assistant

## Chat

Chat must be real-time and backed by Socket.io.

Supported conversation types:

- Private chat
- Batch chat
- Course chat
- Lesson chat
- Live class chat
- Teacher chat
- AI chat

## Live Classes

Initial integrations:

- Google Meet
- Zoom
- Microsoft Teams

Native WebRTC can be added later.

Features:

- Attendance
- Raise hand
- Polls
- Whiteboard
- Chat
- Recording
- AI summary

## Integrations

- Google Calendar
- Google Meet
- Google Drive
- Google Sheets
- Gmail
- Microsoft Teams
- Zoom
- Slack
- Discord
- Stripe
- Razorpay
- Twilio
- Firebase

## Database Standards

Use PostgreSQL.

Required defaults:

- UUID primary keys
- `created_at`
- `updated_at`
- `deleted_at`
- Soft delete
- Audit logs
- Indexes
- Foreign keys
- Optimized queries

Use explicit migrations. Never rely on production schema sync.

## Coding Standards

- Strict TypeScript
- No `any`
- Reusable components
- Reusable DTOs
- Reusable services
- Repository pattern
- Dependency injection
- Validation pipes
- Global exception filter
- Central logger
- Configuration module
- Environment validation
- ESLint
- Prettier

## API Standards

Use REST with versioning under `/api/v1`.

Success response:

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {},
  "meta": {}
}
```

Error response:

```json
{
  "success": false,
  "message": "Operation failed",
  "errors": []
}
```

## Module File Structure

Every backend module should be organized around:

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

## Frontend Standards

- Use Server Components where possible.
- Use Client Components only when necessary.
- Keep views responsive and accessible.
- Reuse shared UI from `packages/ui`.
- Support dark mode.
- Keep product workflows dense, clear, and operational.

## Performance Standards

- Pagination
- Cursor pagination for large datasets
- Lazy loading
- Caching
- Compression
- Optimized queries
- Avoid N+1 queries

## Security Standards

- JWT
- Refresh tokens
- OAuth
- Rate limiting
- Helmet
- CORS
- CSRF protection where applicable
- Input validation
- XSS protection
- Tenant isolation
- Permission validation

## Testing

Required test layers:

- Unit tests
- Integration tests
- E2E tests

Add tests according to risk and blast radius. Shared utilities and security-sensitive paths require stronger coverage.

## Token Optimization Rules

- Never regenerate existing files.
- Never rewrite unrelated code.
- Only generate requested files.
- Reuse existing components.
- Never duplicate utilities.
- Keep responses concise.
- Return only changed files.
- Avoid unnecessary explanations.

## Output Format

Every implementation response must include:

1. Files Created
2. Files Modified
3. Database Changes
4. APIs Added
5. Components Added
6. Tests Added
7. Next Steps

Do not include unnecessary explanation.

## Long-Term Roadmap

Phase 1:

- Authentication
- Organizations
- RBAC
- Courses
- Lessons
- Students
- Teacher Dashboard
- Student Dashboard
- Live Classes
- Chat
- AI Tutor
- Assignments
- Exams
- Analytics

Phase 2:

- Payments
- Marketplace
- Subscriptions
- Certificates
- Parent Portal
- Integrations

Phase 3:

- Mobile Apps
- Offline Learning
- AI Agents
- Voice Tutor
- Whiteboard
- Proctoring

Phase 4:

- Skill Marketplace
- Hiring Portal
- Research Platform
- Global Content Marketplace
- University Network

Always prioritize maintainability, scalability, modularity, performance, and production readiness over quick implementation.
