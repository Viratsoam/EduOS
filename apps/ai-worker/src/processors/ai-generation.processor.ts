import { buildAiTutorPrompt } from "@eduos/prompts";
import type { AiGenerateJob } from "../queues/jobs";

export interface AiGenerationResult {
  generated: boolean;
  message: string;
  promptPreview: string;
}

export async function handleAiGenerationJob(job: AiGenerateJob): Promise<AiGenerationResult> {
  const promptPreview = buildAiTutorPrompt({
    context: "",
    courseTitle: job.courseId,
    learnerQuestion: `Generate ${job.feature} from approved indexed content.`,
  });

  return {
    generated: false,
    message: "AI generation scaffold ready. Retrieval and provider routing are next.",
    promptPreview,
  };
}
