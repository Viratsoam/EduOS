import { Body, Controller, Get, Post, Version } from "@nestjs/common";
import { RequirePermissions } from "../../common/decorators/permissions.decorator";
import { OnboardOrganizationDto } from "./dto/onboard-organization.dto";
import { OrganizationsService } from "./organizations.service";

@Controller("organizations")
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Get("current")
  @Version("1")
  @RequirePermissions("student.view")
  getCurrentOrganization() {
    return this.organizationsService.getCurrentOrganization();
  }

  @Get("onboarding")
  @Version("1")
  @RequirePermissions("analytics.view")
  getOnboardingStatus() {
    return this.organizationsService.getOnboardingStatus();
  }

  @Post("onboarding")
  @Version("1")
  @RequirePermissions("billing.manage")
  onboardOrganization(@Body() dto: OnboardOrganizationDto) {
    return this.organizationsService.onboardOrganization(dto);
  }
}
