export type AiProvider = "openai" | "gemini" | "bedrock";

export type AiFeature =
  | "ai_tutor"
  | "ai_notes"
  | "ai_summary"
  | "ai_flashcards"
  | "ai_quiz_generator"
  | "ai_homework_checker"
  | "ai_assignment_review"
  | "ai_exam_generator"
  | "ai_study_planner"
  | "ai_doubt_solver"
  | "ai_revision_notes"
  | "ai_weakness_detection"
  | "ai_learning_memory"
  | "ai_teacher_assistant";

export interface AiSourceReference {
  chunkId: string;
  lessonId?: string;
  page?: number;
  resourceId: string;
  title: string;
}

export interface AiTutorRequest {
  courseId: string;
  lessonId?: string;
  question: string;
  tenantId: string;
  userId: string;
}

export interface AiTutorResponse {
  answer: string;
  citations: AiSourceReference[];
  refused: boolean;
  refusalReason?: string;
}
