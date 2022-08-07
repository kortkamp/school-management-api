import { Request, Response, NextFunction } from 'express';

import ErrorsApp from '@shared/errors/ErrorsApp';

async function getSchoolMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const { school_id } = request.params;

  if (!school_id) {
    throw new ErrorsApp('Instituição nao informada', 400);
  }
  // should validate school exists

  request.school = {
    id: school_id,
  };

  next();
}

export { getSchoolMiddleware };
