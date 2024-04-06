import { EntityRepository } from "@mikro-orm/postgresql";

import { UserProfile } from "@/common/entities/user-profiles.entity";

export class CustomUserProfilesRepository extends EntityRepository<UserProfile> {}
