import { IsEmail, IsIn, IsNotEmpty, IsString, MaxLength } from "class-validator";
import type { OrganizationPlan } from "@eduos/types";

const organizationPlans = ["starter", "growth", "enterprise"] as const satisfies OrganizationPlan[];

export class OnboardOrganizationDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  name!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  slug!: string;

  @IsIn(organizationPlans)
  plan!: OrganizationPlan;

  @IsEmail()
  contactEmail!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  academicYear!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(80)
  timezone!: string;
}
