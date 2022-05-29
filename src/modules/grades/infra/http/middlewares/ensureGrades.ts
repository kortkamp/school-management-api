import { Request, Response, NextFunction } from 'express';

import ErrorsApp from '@shared/errors/ErrorsApp';

function ensureGrades(authorizedGrades: string[]) {
  return async (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { grade } = request.user;

    const isGradeAuthorized = authorizedGrades.includes(grade);

    if (!isGradeAuthorized) {
      throw new ErrorsApp('User forbidden to access that resource', 403);
    }
    return next();
  };
}

export { ensureGrades };
