import type { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";

import { Permission } from "@/common/entities/permissions.entity";
import { Role } from "@/common/entities/roles.entity";
import { EPermission, EUserRole } from "@/common/enums/roles.enums";

export const seedPermissionsData = async (
  dbService: EntityManager<IDatabaseDriver<Connection>>,
): Promise<void> => {
  const adminRole = dbService.create(Role, { name: EUserRole.ADMIN });
  const superUserRole = dbService.create(Role, { name: EUserRole.SUPER_USER });

  const createPermission = dbService.create(Permission, { name: EPermission.CREATE_USER });
  const readPermission = dbService.create(Permission, { name: EPermission.READ_USER });
  const updatePermission = dbService.create(Permission, { name: EPermission.UPDATE_USER });
  const deletePermission = dbService.create(Permission, { name: EPermission.DELETE_USER });

  adminRole.permissions.add(createPermission);
  adminRole.permissions.add(readPermission);
  adminRole.permissions.add(updatePermission);

  superUserRole.permissions.add(createPermission);
  superUserRole.permissions.add(readPermission);
  superUserRole.permissions.add(updatePermission);
  superUserRole.permissions.add(deletePermission);

  await dbService.persistAndFlush([
    adminRole,
    superUserRole,
    createPermission,
    readPermission,
    updatePermission,
    deletePermission,
  ]);
};
