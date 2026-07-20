export type CourseStatus = "draft" | "published" | "archived";
export type CourseAiStatus = "indexed" | "indexing" | "needs_material";
export type LessonStatus = "draft" | "published" | "archived";

export interface CreateCourseRequest {
  batchName: string;
  description?: string;
  level: string;
  subject: string;
  title: string;
}

export interface CourseSummary {
  aiStatus: CourseAiStatus;
  batchName: string;
  createdAt: string;
  description?: string;
  enrolledCount: number;
  id: string;
  lessonCount: number;
  level: string;
  slug: string;
  status: CourseStatus;
  subject: string;
  tenantId: string;
  title: string;
  updatedAt: string;
}

export interface LessonSummary {
  courseId: string;
  id: string;
  position: number;
  slug: string;
  status: LessonStatus;
  tenantId: string;
  title: string;
}
