import type { ApiResponse, CourseSummary } from "@eduos/types";

export interface EduosClientOptions {
  baseUrl: string;
  getAccessToken?: () => Promise<string | undefined> | string | undefined;
}

export class EduosClient {
  constructor(private readonly options: EduosClientOptions) {}

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
