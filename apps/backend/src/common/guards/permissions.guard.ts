import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import type { AuthenticatedUser, PermissionKey } from "@eduos/types";
import { permissionKeys } from "@eduos/types";
import { REQUIRED_PERMISSIONS_KEY } from "../decorators/permissions.decorator";

const localDemoUser: AuthenticatedUser = {
  email: "admin@eduos.local",
  id: "20000000-0000-4000-8000-000000000001",
  name: "EduOS Admin",
  permissions: [...permissionKeys],
  roles: ["organization_owner"],
  tenantId: "00000000-0000-4000-8000-000000000001",
};

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<PermissionKey[]>(REQUIRED_PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!required?.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{ user?: AuthenticatedUser }>();
    request.user ??= localDemoUser;
    const permissions = request.user?.permissions ?? [];

    return required.every((permission) => permissions.includes(permission));
  }
}
