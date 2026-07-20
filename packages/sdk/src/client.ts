import type {
  ApiResponse,
  AuthSession,
  CourseSummary,
  LoginRequest,
  OrganizationOnboardingRequest,
  OrganizationOnboardingStatus,
  OrganizationProfile,
} from "@eduos/types";

export interface EduosClientOptions {
  baseUrl: string;
  getAccessToken?: () => Promise<string | undefined> | string | undefined;
}

export class EduosClient {
  constructor(private readonly options: EduosClientOptions) {}

  async login(payload: LoginRequest): Promise<ApiResponse<AuthSession>> {
    return this.request<AuthSession>("/api/v1/auth/login", {
      body: JSON.stringify(payload),
      method: "POST",
    });
  }

  async me(): Promise<ApiResponse<AuthSession>> {
    return this.request<AuthSession>("/api/v1/auth/me");
  }

  async getCurrentOrganization(): Promise<ApiResponse<OrganizationProfile>> {
    return this.request<OrganizationProfile>("/api/v1/organizations/current");
  }

  async getOnboardingStatus(): Promise<ApiResponse<OrganizationOnboardingStatus>> {
    return this.request<OrganizationOnboardingStatus>("/api/v1/organizations/onboarding");
  }

  async onboardOrganization(
    payload: OrganizationOnboardingRequest,
  ): Promise<ApiResponse<{ onboarding: OrganizationOnboardingStatus; organization: OrganizationProfile }>> {
    return this.request<{ onboarding: OrganizationOnboardingStatus; organization: OrganizationProfile }>(
      "/api/v1/organizations/onboarding",
      {
        body: JSON.stringify(payload),
        method: "POST",
      },
    );
  }

  async listCourses(): Promise<ApiResponse<CourseSummary[]>> {
    return this.request<CourseSummary[]>("/api/v1/courses");
  }

  private async request<TData>(path: string, init?: RequestInit): Promise<ApiResponse<TData>> {
    const token = await this.options.getAccessToken?.();
    const response = await fetch(new URL(path, this.options.baseUrl), {
      ...init,
      headers: {
        "content-type": "application/json",
        ...(token ? { authorization: `Bearer ${token}` } : {}),
        ...init?.headers,
      },
    });

    return (await response.json()) as ApiResponse<TData>;
  }
}
