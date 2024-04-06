import { Injectable } from "@nestjs/common";

import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";

import { Role } from "../common/entities/roles.entity";

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private readonly rolesRepository: EntityRepository<Role>) {}

  findByIdOrThrow(id: number) {
    return this.rolesRepository.findOneOrFail(id, {
      populate: ["permissions"],
    });
  }
}
