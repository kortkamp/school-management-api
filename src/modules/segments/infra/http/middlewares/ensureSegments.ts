import { Request, Response, NextFunction } from 'express';

import ErrorsApp from '@shared/errors/ErrorsApp';

function ensureSegments(authorizedSegments: string[]) {
  return async (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { segment } = request.user;

    const isSegmentAuthorized = authorizedSegments.includes(segment);

    if (!isSegmentAuthorized) {
      throw new ErrorsApp('User forbidden to access that resource', 403);
    }
    return next();
  };
}

export { ensureSegments };
