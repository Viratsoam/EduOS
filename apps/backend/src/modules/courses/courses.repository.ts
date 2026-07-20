import { Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import type { CourseSummary, TenantContext } from "@eduos/types";

const seedCourses: CourseSummary[] = [
  {
    aiStatus: "indexed",
    batchName: "JEE Alpha",
    createdAt: "2026-07-20T08:00:00.000Z",
    description: "Core mechanics, waves, electricity, and modern physics foundation.",
    enrolledCount: 428,
    id: "10000000-0000-4000-8000-000000000001",
    lessonCount: 42,
    level: "Senior secondary",
    slug: "physics-foundations",
    status: "published",
    subject: "Physics",
    tenantId: "00000000-0000-4000-8000-000000000001",
    title: "Physics Foundations",
    updatedAt: "2026-07-20T08:00:00.000Z",
  },
  {
    aiStatus: "indexing",
    batchName: "Grade 10 Core",
    createdAt: "2026-07-20T08:00:00.000Z",
    description: "Algebra practice path with assignments and weak-area analytics.",
    enrolledCount: 316,
    id: "10000000-0000-4000-8000-000000000002",
    lessonCount: 36,
    level: "Grade 10",
    slug: "algebra-mastery",
    status: "draft",
    subject: "Mathematics",
    tenantId: "00000000-0000-4000-8000-000000000001",
    title: "Algebra Mastery",
    updatedAt: "2026-07-20T08:00:00.000Z",
  },
];

@Injectable()
export class CoursesRepository {
  private readonly courses = [...seedCourses];

  listByTenant(tenant: TenantContext): CourseSummary[] {
    return this.courses.filter((course) => course.tenantId === tenant.tenantId);
  }

  create(
    tenant: TenantContext,
    input: { batchName: string; description?: string; level: string; subject: string; title: string },
  ): CourseSummary {
    const now = new Date().toISOString();
    const course: CourseSummary = {
      aiStatus: "needs_material",
      batchName: input.batchName,
      createdAt: now,
      ...(input.description ? { description: input.description } : {}),
      enrolledCount: 0,
      id: randomUUID(),
      lessonCount: 0,
      level: input.level,
      slug: input.title.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-").replaceAll(/^-|-$/g, ""),
      status: "draft",
      subject: input.subject,
      tenantId: tenant.tenantId,
      title: input.title,
      updatedAt: now,
    };

    this.courses.push(course);
    return course;
  }
}
