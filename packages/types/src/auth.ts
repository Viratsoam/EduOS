import type { OrganizationProfile, OrganizationOnboardingStatus } from "./organizations";
import type { AuthenticatedUser } from "./users";

export interface LoginRequest {
  email: string;
  organizationSlug: string;
  password: string;
}

export interface AuthSession {
  accessToken: string;
  expiresAt: string;
  organization: OrganizationProfile;
  onboarding: OrganizationOnboardingStatus;
  user: AuthenticatedUser;
}
