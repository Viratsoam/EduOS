import { SetMetadata } from "@nestjs/common";
import type { PermissionKey } from "@eduos/types";

export const REQUIRED_PERMISSIONS_KEY = "required_permissions";

export function RequirePermissions(...permissions: PermissionKey[]) {
  return SetMetadata(REQUIRED_PERMISSIONS_KEY, permissions);
}
