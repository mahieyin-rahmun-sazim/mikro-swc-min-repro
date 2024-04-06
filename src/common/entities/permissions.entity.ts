import { Collection, Entity, Enum, ManyToMany, PrimaryKey } from "@mikro-orm/core";

import { BaseEntity } from "@/common/entities/base.entity";
import { Role } from "@/common/entities/roles.entity";

import { EPermission } from "../enums/roles.enums";

@Entity({
  tableName: "permissions",
})
export class Permission extends BaseEntity {
  constructor(name: EPermission) {
    super();
    this.name = name;
  }

  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Enum(() => EPermission)
  name!: EPermission;

  @ManyToMany(() => Role, (role) => role.permissions, {
    pivotTable: "roles_permissions",
    joinColumn: "role_id",
    inverseJoinColumn: "permission_id",
  })
  roles = new Collection<Role>(this);
}
