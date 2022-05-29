import { Request, Response, NextFunction } from 'express';

import ErrorsApp from '@shared/errors/ErrorsApp';

function ensureGradesOrSelf(authorizedGrades: string[]) {
  return async (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { user } = request;

    const isGradeAuthorized = authorizedGrades.includes(user?.grade);

    const isReferencingSelf = request.params.id === user?.id;

    if (isGradeAuthorized || isReferencingSelf) {
      return next();
    }

    throw new ErrorsApp('User forbidden to access that resource', 403);
  };
}

export { ensureGradesOrSelf };
