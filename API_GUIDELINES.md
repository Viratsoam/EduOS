# EduOS API Guidelines

## Purpose

This document defines REST, WebSocket, response, error, authentication, authorization, and documentation standards.

## Versioning

All REST APIs must live under:

```text
/api/v1
```

Do not introduce unversioned public APIs.

## Response Envelope

Success:

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {},
  "meta": {}
}
```

Error:

```json
{
  "success": false,
  "message": "Operation failed",
  "errors": []
}
```

## Naming

- Use plural resources: `/courses`, `/lessons`, `/assignments`.
- Use nested routes only when scope is important.
- Prefer query filters over deeply nested routes.
- Use kebab-case for route segments.

Examples:

```text
GET /api/v1/courses
POST /api/v1/courses
GET /api/v1/courses/:courseId
POST /api/v1/lessons/:lessonId/publish
GET /api/v1/assignments?courseId=...
```

## Pagination

Use cursor pagination for large or growing datasets.

Response `meta` should include:

```json
{
  "cursor": "next-cursor",
  "hasMore": true,
  "limit": 20
}
```

Use offset pagination only for small administrative lists where stable ordering is not critical.

## Authentication

Use JWT access tokens and refresh tokens.

Access tokens:

- Short lived
- Include user identity
- Include coarse tenant context when safe

Refresh tokens:

- Rotated
- Revocable
- Stored securely

## Authorization

Every protected endpoint must declare required permissions.

Examples:

- `course.create`
- `course.edit`
- `lesson.publish`
- `analytics.view`

Authorization must happen after authentication and tenant resolution.

## Tenant Scope

Every tenant-owned endpoint must resolve tenant context and filter by `tenant_id`.

Never accept arbitrary `tenant_id` from public request bodies as the source of truth.

## Validation

All request bodies must use DTO validation.

Reject unknown or invalid fields. Normalize safe fields explicitly.

## Status Codes

- `200`: successful read or update
- `201`: successful creation
- `204`: successful deletion with no body
- `400`: validation error
- `401`: unauthenticated
- `403`: authenticated but not allowed
- `404`: not found or not visible in tenant
- `409`: conflict
- `429`: rate limit
- `500`: unexpected server error

## Errors

Do not leak internals in public errors.

Include developer-friendly error codes where useful:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "code": "COURSE_TITLE_REQUIRED",
      "field": "title",
      "message": "Title is required"
    }
  ]
}
```

## Swagger and OpenAPI

Every public endpoint must be documented with:

- Summary
- Description where needed
- Auth requirements
- Request DTO
- Response DTO
- Error responses

## WebSocket Standards

Use namespaced, predictable event names.

Examples:

```text
chat.room.join
chat.room.leave
chat.message.create
chat.message.created
live-class.hand.raise
notification.created
```

WebSocket messages must still enforce:

- Authentication
- Tenant scope
- Room membership
- Permission checks

## Rate Limits

Rate limit:

- Authentication endpoints
- AI endpoints
- File upload endpoints
- Public invite endpoints

Rate limits should be tenant-aware and user-aware where possible.
