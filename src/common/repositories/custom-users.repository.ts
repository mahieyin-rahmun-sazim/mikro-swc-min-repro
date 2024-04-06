import { EntityRepository } from "@mikro-orm/postgresql";

import { User } from "../entities/users.entity";

export class CustomUsersRepository extends EntityRepository<User> {}
