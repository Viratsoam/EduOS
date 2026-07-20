import { Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import type { CourseSummary, TenantContext } from "@eduos/types";

const seedCourses: CourseSummary[] = [
  {
    id: "10000000-0000-4000-8000-000000000001",
    slug: "physics-foundations",
    status: "published",
    tenantId: "00000000-0000-4000-8000-000000000001",
    title: "Physics Foundations",
  },
  {
    id: "10000000-0000-4000-8000-000000000002",
    slug: "algebra-mastery",
    status: "draft",
    tenantId: "00000000-0000-4000-8000-000000000001",
    title: "Algebra Mastery",
  },
];

@Injectable()
export class CoursesRepository {
  private readonly courses = [...seedCourses];

  listByTenant(tenant: TenantContext): CourseSummary[] {
    return this.courses.filter((course) => course.tenantId === tenant.tenantId);
  }

  create(tenant: TenantContext, title: string): CourseSummary {
    const course: CourseSummary = {
      id: randomUUID(),
      slug: title.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-").replaceAll(/^-|-$/g, ""),
      status: "draft",
      tenantId: tenant.tenantId,
      title,
    };

    this.courses.push(course);
    return course;
  }
}
