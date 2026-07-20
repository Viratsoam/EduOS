import { groundingPolicy } from "./grounding-policy";

export interface BuildAiTutorPromptInput {
  context: string;
  courseTitle: string;
  learnerQuestion: string;
}

export function buildAiTutorPrompt(input: BuildAiTutorPromptInput): string {
  return [
    "You are EduOS AI Tutor.",
    groundingPolicy,
    `Course: ${input.courseTitle}`,
    "Approved context:",
    input.context,
    "Learner question:",
    input.learnerQuestion,
  ].join("\n\n");
}
