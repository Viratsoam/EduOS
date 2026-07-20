export type CourseStatus = "draft" | "published" | "archived";
export type LessonStatus = "draft" | "published" | "archived";

export interface CourseSummary {
  id: string;
  slug: string;
  status: CourseStatus;
  tenantId: string;
  title: string;
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
