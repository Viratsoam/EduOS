import { Injectable } from "@nestjs/common";
import type { AuthSession } from "@eduos/types";
import { permissionKeys } from "@eduos/types";
import { OrganizationsService } from "../organizations/organizations.service";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(private readonly organizationsService: OrganizationsService) {}

  login(dto: LoginDto): AuthSession {
    return this.buildSession(dto.email, dto.organizationSlug);
  }

  me(): AuthSession {
    return this.buildSession("admin@via.edu", "via");
  }

  private buildSession(email: string, organizationSlug: string): AuthSession {
    const organization = this.organizationsService.getCurrentOrganization(organizationSlug);
    const onboarding = this.organizationsService.getOnboardingStatus(organization.slug);

    return {
      accessToken: `demo-${organization.slug}-owner-token`,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString(),
      onboarding,
      organization,
      user: {
        email,
        id: "user_org_owner_001",
        name: "Vikas Soam",
        permissions: [...permissionKeys],
        roles: ["organization_owner", "admin"],
        tenantId: organization.id,
      },
    };
  }
}
