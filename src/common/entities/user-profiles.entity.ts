import { BadRequestException } from "@nestjs/common";

import {
  Entity,
  OneToOne,
  PrimaryKey,
  Property,
  Rel,
  ManyToOne,
  EntityRepositoryType,
} from "@mikro-orm/core";

import { Role } from "@/common/entities/roles.entity";
import { User } from "@/common/entities/users.entity";

import { CustomUserProfilesRepository } from "../repositories/custom-user-profiles.repository";
import { BaseEntity } from "./base.entity";

@Entity({
  tableName: "user_profiles",
  repository: () => CustomUserProfilesRepository,
})
export class UserProfile extends BaseEntity {
  [EntityRepositoryType]?: CustomUserProfilesRepository;

  constructor(firstName: string, lastName: string) {
    super();

    this.firstName = firstName;
    this.lastName = lastName;
  }

  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property({ fieldName: "first_name" })
  firstName!: string;

  @Property({ fieldName: "last_name" })
  lastName!: string;

  @Property({ persist: false })
  get email() {
    return this.user === undefined
      ? new BadRequestException("User not properly defined")
      : this.user.email;
  }

  @OneToOne(() => User, { hidden: true })
  user!: Rel<User>;

  @ManyToOne(() => Role)
  role!: Rel<Role>;
}
