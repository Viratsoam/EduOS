import type { SystemRole } from "./permissions";

export type OrganizationPlan = "starter" | "growth" | "enterprise";

export type OrganizationOnboardingStep =
  | "school_profile"
  | "admin_team"
  | "role_mapping"
  | "course_seed"
  | "ai_policy"
  | "launch_review";

export interface OrganizationProfile {
  academicYear: string;
  contactEmail: string;
  id: string;
  name: string;
  plan: OrganizationPlan;
  slug: string;
  timezone: string;
}

export interface OrganizationOnboardingRequest {
  academicYear: string;
  contactEmail: string;
  name: string;
  plan: OrganizationPlan;
  slug: string;
  timezone: string;
}

export interface OrganizationOnboardingStatus {
  completedSteps: OrganizationOnboardingStep[];
  nextStep: OrganizationOnboardingStep;
  progress: number;
  roleAssignments: Array<{
    count: number;
    role: SystemRole;
  }>;
}
