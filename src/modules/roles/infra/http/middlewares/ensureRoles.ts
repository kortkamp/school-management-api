import { RoleTypes } from '@modules/roles/models/IRole';
import { ListUserSchoolRolesService } from '@modules/users/services/ListUserSchoolRolesService';
import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import ErrorsApp from '@shared/errors/ErrorsApp';

function ensureRoles(authorizedRoles: RoleTypes[]) {
  return async (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    const listRolesService = container.resolve(ListUserSchoolRolesService);

    const user_id = request.user.id;

    if (!user_id) {
      throw new ErrorsApp('Usuário não autenticado', 401);
    }

    const school_id = request.school?.id || request.params?.school_id;

    if (!school_id) {
      throw new ErrorsApp('Instituição nao informada', 400);
    }

    const userSchoolRoles = await listRolesService.execute(user_id, school_id);

    const isRoleAuthorized = userSchoolRoles.find(userRole =>
      authorizedRoles.includes(userRole.role.type),
    );

    const isSystemAdmin = userSchoolRoles.find(
      userRole => userRole.role.type === RoleTypes.SYSTEM_ADMIN,
    );

    if (!isRoleAuthorized && !isSystemAdmin) {
      throw new ErrorsApp('Não permitido para este usuário', 403);
    }
    return next();
  };
}

export { ensureRoles };
