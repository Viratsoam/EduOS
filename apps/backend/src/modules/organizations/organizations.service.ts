import { Injectable } from "@nestjs/common";
import type {
  OrganizationOnboardingStatus,
  OrganizationProfile,
  SystemRole,
} from "@eduos/types";
import { OnboardOrganizationDto } from "./dto/onboard-organization.dto";

const defaultOrganization: OrganizationProfile = {
  academicYear: "2026-2027",
  contactEmail: "admin@via.edu",
  id: "org_via",
  name: "Vikas International Academy",
  plan: "growth",
  slug: "via",
  timezone: "Asia/Kolkata",
};

const defaultRoleAssignments: Array<{ count: number; role: SystemRole }> = [
  { count: 2, role: "admin" },
  { count: 18, role: "teacher" },
  { count: 6, role: "assistant_teacher" },
  { count: 1248, role: "student" },
];

@Injectable()
export class OrganizationsService {
  private organization = defaultOrganization;
  private onboarding: OrganizationOnboardingStatus = {
    completedSteps: ["school_profile", "admin_team", "role_mapping", "course_seed"],
    nextStep: "ai_policy",
    progress: 72,
    roleAssignments: defaultRoleAssignments,
  };

  getCurrentOrganization(slug = this.organization.slug): OrganizationProfile {
    if (slug !== this.organization.slug) {
      return { ...this.organization, slug };
    }

    return this.organization;
  }

  getOnboardingStatus(_slug = this.organization.slug): OrganizationOnboardingStatus {
    return this.onboarding;
  }

  onboardOrganization(dto: OnboardOrganizationDto) {
    this.organization = {
      academicYear: dto.academicYear,
      contactEmail: dto.contactEmail,
      id: `org_${dto.slug}`,
      name: dto.name,
      plan: dto.plan,
      slug: dto.slug,
      timezone: dto.timezone,
    };

    this.onboarding = {
      completedSteps: ["school_profile", "admin_team", "role_mapping", "course_seed", "ai_policy"],
      nextStep: "launch_review",
      progress: 86,
      roleAssignments: defaultRoleAssignments,
    };

    return {
      onboarding: this.onboarding,
      organization: this.organization,
    };
  }
}
