import { Request, Response, NextFunction } from 'express';

import ErrorsApp from '@shared/errors/ErrorsApp';

function ensureRolesOrSelf(authorizedRoles: string[]) {
  return async (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { user } = request;

    const isRoleAuthorized = authorizedRoles.includes(user?.role);

    const isReferencingSelf = request.params.id === user?.id;

    if (isRoleAuthorized || isReferencingSelf) {
      return next();
    }

    throw new ErrorsApp('Usuário não autorizado a acessar este recurso', 403);
  };
}

export { ensureRolesOrSelf };
