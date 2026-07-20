import type { PermissionKey, SystemRole } from "./permissions";

export interface AuthenticatedUser {
  email: string;
  id: string;
  name: string;
  permissions: PermissionKey[];
  roles: SystemRole[];
  tenantId: string;
}
