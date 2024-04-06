import { BadRequestException, Injectable } from "@nestjs/common";

import * as argon2 from "argon2";

import { EUserRole } from "@/common/enums/roles.enums";
import { CustomRolesRepository } from "@/common/repositories/custom-roles.repository";
import { CustomUsersRepository } from "@/common/repositories/custom-users.repository";

import { RegisterUserDto } from "./users.dtos";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(
    private readonly customUserRepository: CustomUsersRepository,
    private readonly usersRepository: UsersRepository,
    private readonly rolesRepository: CustomRolesRepository,
  ) {}

  private hashPassword(password: string) {
    return argon2.hash(password);
  }

  async create(registerUserDto: RegisterUserDto, roleName = EUserRole.ADMIN) {
    const existingUser = await this.customUserRepository.findOne({
      email: registerUserDto.email,
    });

    if (existingUser) {
      throw new BadRequestException("User already exists");
    }

    const role = await this.rolesRepository.findOneOrFail({ name: roleName });

    const newUser = await this.usersRepository.create(
      {
        ...registerUserDto,
        password: await this.hashPassword(registerUserDto.password),
      },
      role,
    );

    return newUser;
  }
}
