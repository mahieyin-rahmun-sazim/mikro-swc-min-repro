import { Body, Controller, Post, UseInterceptors } from "@nestjs/common";

import { ResponseTransformInterceptor } from "@/common/interceptors/response-transform.interceptor";

import { RegisterUserDto, UserResponse } from "./users.dtos";
import { UsersSerializer } from "./users.serializer";
import { UsersService } from "./users.service";

@UseInterceptors(ResponseTransformInterceptor)
@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersSerializer: UsersSerializer,
  ) {}

  @Post()
  async create(@Body() registerUserDto: RegisterUserDto): Promise<UserResponse> {
    const newUser = await this.usersService.create(registerUserDto);
    return this.usersSerializer.serialize(newUser);
  }
}
