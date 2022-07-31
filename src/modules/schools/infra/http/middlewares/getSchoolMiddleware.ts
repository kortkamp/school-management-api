import { Request, Response, NextFunction } from 'express';

import ErrorsApp from '@shared/errors/ErrorsApp';

async function getSchoolMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const { school } = request.params;

  if (!school) {
    throw new ErrorsApp('Instituição nao informada', 400);
  }
  // should validate school exists

  request.school = {
    id: school,
  };

  next();
}

export { getSchoolMiddleware };
