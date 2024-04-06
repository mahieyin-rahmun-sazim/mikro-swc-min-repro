import { Entity, EntityRepositoryType, OneToOne, PrimaryKey, Property, Rel } from "@mikro-orm/core";

import { BaseEntity } from "@/common/entities/base.entity";
import { UserProfile } from "@/common/entities/user-profiles.entity";

import { CustomUsersRepository } from "../repositories/custom-users.repository";

@Entity({
  tableName: "users",
  repository: () => CustomUsersRepository,
})
export class User extends BaseEntity {
  [EntityRepositoryType]?: CustomUsersRepository;

  constructor(email: string, password?: string) {
    super();

    this.email = email;
    this.password = password;
  }

  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property({ unique: true })
  email!: string;

  @Property({ nullable: true })
  password?: string | null;

  @OneToOne(() => UserProfile, { mappedBy: (userProfile) => userProfile.user })
  userProfile!: Rel<UserProfile>;
}
