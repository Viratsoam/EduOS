import type { PermissionKey, SystemRole } from "./permissions";

export type UserStatus = "active" | "invited" | "suspended";

export interface AuthenticatedUser {
  email: string;
  id: string;
  name: string;
  permissions: PermissionKey[];
  roles: SystemRole[];
  tenantId: string;
}

export interface OrganizationMember {
  email: string;
  id: string;
  joinedAt?: string;
  lastActiveAt?: string;
  name: string;
  permissions: PermissionKey[];
  roles: SystemRole[];
  status: UserStatus;
  tenantId: string;
}

export interface InviteMemberRequest {
  email: string;
  name: string;
  role: SystemRole;
}
