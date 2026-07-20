import { Injectable } from "@nestjs/common";
import { demoTenantContext } from "../../common/tenant/tenant-context";
import { InviteMemberDto } from "./dto/invite-member.dto";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  listMembers() {
    return this.usersRepository.listByTenant(demoTenantContext);
  }

  inviteMember(dto: InviteMemberDto) {
    return this.usersRepository.invite(demoTenantContext, dto);
  }
}
