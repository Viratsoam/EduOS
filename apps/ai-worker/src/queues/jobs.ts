export interface ContentIngestJob {
  courseId: string;
  lessonId?: string;
  resourceId: string;
  tenantId: string;
  type: "content.ingest";
}

export interface AiGenerateJob {
  courseId: string;
  feature: "ai_summary" | "ai_flashcards" | "ai_quiz_generator";
  sourceId: string;
  tenantId: string;
  type: "ai.generate";
}

export type EduosWorkerJob = AiGenerateJob | ContentIngestJob;
