import { authConfig } from '@config/auth';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import ErrorsApp from '@shared/errors/ErrorsApp';
import { tenantStorage } from '@shared/infra/tenantContext/tenantStorage';

interface ITokenResponse {
  iat: number;
  exp: number;
  sub: string;
  tenant_id: string;
}

async function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const header = request.headers.authorization;

  if (!header) {
    throw new ErrorsApp('Token not provided', 401);
  }
  try {
    const [, token] = header.split(' ');

    const check = (await verify(
      token,
      authConfig.jwt.secret,
    )) as ITokenResponse;

    request.user = {
      id: check.sub,
      tenant_id: check.tenant_id,
    };
  } catch (error) {
    throw new ErrorsApp('Invalid token', 401);
  }
  tenantStorage.wrapper(request.user.tenant_id, () => next());
}

export { authMiddleware };
