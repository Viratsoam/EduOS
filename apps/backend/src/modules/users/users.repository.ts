import { Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import type { InviteMemberRequest, OrganizationMember, SystemRole, TenantContext } from "@eduos/types";
import { permissionKeys } from "@eduos/types";

const teacherPermissions = permissionKeys.filter((permission) =>
  ["course.create", "course.edit", "lesson.publish", "student.view", "assignment.review", "analytics.view"].includes(permission),
);

const studentPermissions = permissionKeys.filter((permission) => permission === "student.view");

const seedMembers: OrganizationMember[] = [
  {
    email: "admin@via.edu",
    id: "user_org_owner_001",
    joinedAt: "2026-07-20T08:00:00.000Z",
    lastActiveAt: "2026-07-20T10:30:00.000Z",
    name: "Vikas Soam",
    permissions: [...permissionKeys],
    roles: ["organization_owner", "admin"],
    status: "active",
    tenantId: "00000000-0000-4000-8000-000000000001",
  },
  {
    email: "physics@via.edu",
    id: "user_teacher_001",
    joinedAt: "2026-07-20T08:15:00.000Z",
    lastActiveAt: "2026-07-20T09:45:00.000Z",
    name: "Ananya Sharma",
    permissions: teacherPermissions,
    roles: ["teacher"],
    status: "active",
    tenantId: "00000000-0000-4000-8000-000000000001",
  },
  {
    email: "student.alpha@via.edu",
    id: "user_student_001",
    joinedAt: "2026-07-20T08:45:00.000Z",
    lastActiveAt: "2026-07-20T10:05:00.000Z",
    name: "Aarav Mehta",
    permissions: studentPermissions,
    roles: ["student"],
    status: "active",
    tenantId: "00000000-0000-4000-8000-000000000001",
  },
];

@Injectable()
export class UsersRepository {
  private readonly members = [...seedMembers];

  listByTenant(tenant: TenantContext): OrganizationMember[] {
    return this.members.filter((member) => member.tenantId === tenant.tenantId);
  }

  invite(tenant: TenantContext, input: InviteMemberRequest): OrganizationMember {
    const invitedAt = new Date().toISOString();
    const member: OrganizationMember = {
      email: input.email,
      id: randomUUID(),
      joinedAt: invitedAt,
      name: input.name,
      permissions: permissionsForRole(input.role),
      roles: [input.role],
      status: "invited",
      tenantId: tenant.tenantId,
    };

    this.members.unshift(member);
    return member;
  }
}

function permissionsForRole(role: SystemRole) {
  if (role === "admin") {
    return [...permissionKeys];
  }

  if (role === "teacher" || role === "assistant_teacher") {
    return teacherPermissions;
  }

  return studentPermissions;
}
