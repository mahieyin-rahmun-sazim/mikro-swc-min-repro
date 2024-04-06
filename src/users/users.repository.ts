import { Injectable } from "@nestjs/common";

import { wrap } from "@mikro-orm/core";

import { Role } from "@/common/entities/roles.entity";
import { UserProfile } from "@/common/entities/user-profiles.entity";
import { User } from "@/common/entities/users.entity";
import { CustomUserProfilesRepository } from "@/common/repositories/custom-user-profiles.repository";

import { RegisterUserDto } from "./users.dtos";

@Injectable()
export class UsersRepository {
  private readonly em;

  constructor(private readonly userProfileRepository: CustomUserProfilesRepository) {
    this.em = this.userProfileRepository.getEntityManager();
  }

  async create(registerUserDto: RegisterUserDto, role: Role) {
    const {
      email,
      password,
      profileInput: { firstName, lastName },
    } = registerUserDto;

    const user = new User(email, password);
    const userProfile = new UserProfile(firstName, lastName);

    wrap(userProfile).assign({ user, role });

    await this.em.persistAndFlush([user, userProfile]);

    return user;
  }
}
