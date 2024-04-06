import { Module } from "@nestjs/common";

import { MikroOrmModule } from "@mikro-orm/nestjs";

import { CustomRolesRepository } from "@/common/repositories/custom-roles.repository";

import { Role } from "../common/entities/roles.entity";
import { RolesService } from "./roles.service";

@Module({
  imports: [MikroOrmModule.forFeature([Role])],
  controllers: [],
  providers: [RolesService, CustomRolesRepository],
  exports: [RolesService],
})
export class RolesModule {}
