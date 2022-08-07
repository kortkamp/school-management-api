import { messagesRoutes } from '@modules/messages/infra/http/routes/messages.routes';
import { rolesRoutes } from '@modules/roles/infra/http/routes/roles.routes';
import { getSchoolMiddleware } from '@modules/schools/infra/http/middlewares/getSchoolMiddleware';
import { schoolsRoutes } from '@modules/schools/infra/http/routes/schools.routes';
import { sessionsRoutes } from '@modules/sessions/infra/http/routes/sessions.routes';
import { usersRoutes } from '@modules/users/infra/http/routes/users.routes';
import { userTokensRoutes } from '@modules/users/infra/http/routes/userTokens.routes';
import { Router } from 'express';

import { tenantRoutes } from './tenant.routes';

const routes = Router();

// general routes
routes.use('/users', userTokensRoutes);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/schools', schoolsRoutes);
routes.use('/roles', rolesRoutes);
routes.use('/messages', messagesRoutes);

// school specific routes
routes.use('/:school_id', getSchoolMiddleware, tenantRoutes);

export { routes };
