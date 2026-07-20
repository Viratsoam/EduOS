export const permissionKeys = [
  "course.create",
  "course.edit",
  "course.delete",
  "lesson.publish",
  "student.edit",
  "student.view",
  "attendance.mark",
  "assignment.review",
  "analytics.view",
  "billing.manage",
] as const;

export type PermissionKey = (typeof permissionKeys)[number];

export type SystemRole =
  | "platform_owner"
  | "organization_owner"
  | "admin"
  | "teacher"
  | "assistant_teacher"
  | "student"
  | "parent"
  | "guest";
