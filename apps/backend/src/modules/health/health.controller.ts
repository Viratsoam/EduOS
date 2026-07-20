import { Controller, Get, Version } from "@nestjs/common";

@Controller("health")
export class HealthController {
  @Get()
  @Version("1")
  getHealth() {
    return {
      service: "eduos-backend",
      status: "ok",
      version: "0.1.0",
    };
  }
}
