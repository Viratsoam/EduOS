import type { AuthenticatedUser, PermissionKey } from "@eduos/types";

export function hasPermission(user: AuthenticatedUser, permission: PermissionKey): boolean {
  return user.permissions.includes(permission);
}

export function requirePermission(user: AuthenticatedUser, permission: PermissionKey): void {
  if (!hasPermission(user, permission)) {
    throw new Error(`Missing permission: ${permission}`);
  }
}
