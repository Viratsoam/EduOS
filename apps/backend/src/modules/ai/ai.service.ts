import { Injectable } from "@nestjs/common";
import type { AiTutorResponse } from "@eduos/types";
import { buildAiTutorPrompt } from "@eduos/prompts";
import { AskAiTutorDto } from "./dto/ask-ai-tutor.dto";

@Injectable()
export class AiService {
  askTutor(dto: AskAiTutorDto): AiTutorResponse & { promptPreview: string } {
    const promptPreview = buildAiTutorPrompt({
      context: "",
      courseTitle: dto.courseId,
      learnerQuestion: dto.question,
    });

    return {
      answer:
        "I do not have approved course context for this question yet. Upload lesson material or index course resources before asking the AI Tutor.",
      citations: [],
      promptPreview,
      refused: true,
      refusalReason: "NO_APPROVED_CONTEXT",
    };
  }
}
