import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { PermissionsGuard } from "./common/guards/permissions.guard";
import { AiModule } from "./modules/ai/ai.module";
import { CoursesModule } from "./modules/courses/courses.module";
import { HealthModule } from "./modules/health/health.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HealthModule,
    CoursesModule,
    AiModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
})
export class AppModule {}
