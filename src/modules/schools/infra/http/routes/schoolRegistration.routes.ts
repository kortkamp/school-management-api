import { ensureRoles } from '@modules/roles/infra/http/middlewares/ensureRoles';
import { RoleTypes } from '@modules/roles/models/IRole';
import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { SchoolsController } from '../controllers/SchoolsController';

const schoolRegistrationRoutes = Router();

schoolRegistrationRoutes.use(authMiddleware);

const schoolsController = new SchoolsController();

schoolRegistrationRoutes.use(ensureRoles([RoleTypes.REGISTER]));

schoolRegistrationRoutes.post('/finish/', schoolsController.finishRegistration);

export { schoolRegistrationRoutes };
