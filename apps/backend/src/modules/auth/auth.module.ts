import { Module } from "@nestjs/common";
import { OrganizationsModule } from "../organizations/organizations.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  controllers: [AuthController],
  imports: [OrganizationsModule],
  providers: [AuthService],
})
export class AuthModule {}
