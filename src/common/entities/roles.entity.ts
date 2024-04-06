import { Collection, Entity, Enum, ManyToMany, PrimaryKey } from "@mikro-orm/core";
import { EntityRepositoryType } from "@mikro-orm/postgresql";

import { BaseEntity } from "@/common/entities/base.entity";
import { Permission } from "@/common/entities/permissions.entity";
import { EUserRole } from "@/common/enums/roles.enums";

import { CustomRolesRepository } from "../repositories/custom-roles.repository";

@Entity({
  tableName: "roles",
  repository: () => CustomRolesRepository,
})
export class Role extends BaseEntity {
  [EntityRepositoryType]?: CustomRolesRepository;

  constructor(name: EUserRole) {
    super();

    this.name = name;
  }

  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Enum(() => EUserRole)
  name!: EUserRole;

  @ManyToMany(() => Permission, (permission) => permission.roles, { owner: true })
  permissions = new Collection<Permission>(this);
}
