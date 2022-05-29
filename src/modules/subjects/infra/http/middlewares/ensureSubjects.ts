import { Request, Response, NextFunction } from 'express';

import ErrorsApp from '@shared/errors/ErrorsApp';

function ensureSubjects(authorizedSubjects: string[]) {
  return async (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { subject } = request.user;

    const isSubjectAuthorized = authorizedSubjects.includes(subject);

    if (!isSubjectAuthorized) {
      throw new ErrorsApp('User forbidden to access that resource', 403);
    }
    return next();
  };
}

export { ensureSubjects };
