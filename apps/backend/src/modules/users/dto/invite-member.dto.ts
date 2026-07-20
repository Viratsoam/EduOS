import { IsEmail, IsIn, IsNotEmpty, IsString, MaxLength } from "class-validator";
import type { SystemRole } from "@eduos/types";

const assignableRoles = ["admin", "teacher", "assistant_teacher", "student", "parent"] as const satisfies SystemRole[];

export class InviteMemberDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  name!: string;

  @IsIn(assignableRoles)
  role!: (typeof assignableRoles)[number];
}
