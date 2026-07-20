import { Body, Controller, Post, Version } from "@nestjs/common";
import { RequirePermissions } from "../../common/decorators/permissions.decorator";
import { AiService } from "./ai.service";
import { AskAiTutorDto } from "./dto/ask-ai-tutor.dto";

@Controller("ai")
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post("tutor/ask")
  @Version("1")
  @RequirePermissions("student.view")
  askTutor(@Body() dto: AskAiTutorDto) {
    return this.aiService.askTutor(dto);
  }
}
