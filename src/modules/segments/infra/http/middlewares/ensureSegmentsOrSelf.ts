import { Request, Response, NextFunction } from 'express';

import ErrorsApp from '@shared/errors/ErrorsApp';

function ensureSegmentsOrSelf(authorizedSegments: string[]) {
  return async (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { user } = request;

    const isSegmentAuthorized = authorizedSegments.includes(user?.segment);

    const isReferencingSelf = request.params.id === user?.id;

    if (isSegmentAuthorized || isReferencingSelf) {
      return next();
    }

    throw new ErrorsApp('User forbidden to access that resource', 403);
  };
}

export { ensureSegmentsOrSelf };
