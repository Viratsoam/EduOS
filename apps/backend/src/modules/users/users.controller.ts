import { Body, Controller, Get, Post, Version } from "@nestjs/common";
import { RequirePermissions } from "../../common/decorators/permissions.decorator";
import { InviteMemberDto } from "./dto/invite-member.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Version("1")
  @RequirePermissions("student.view")
  listMembers() {
    return this.usersService.listMembers();
  }

  @Post("invitations")
  @Version("1")
  @RequirePermissions("student.edit")
  inviteMember(@Body() dto: InviteMemberDto) {
    return this.usersService.inviteMember(dto);
  }
}
