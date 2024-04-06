import { EntityRepository } from "@mikro-orm/postgresql";

import { Role } from "../entities/roles.entity";

export class CustomRolesRepository extends EntityRepository<Role> {}
