import { gradesRoutes } from '@modules/grades/infra/http/routes/grades.routes';
import { rolesRoutes } from '@modules/roles/infra/http/routes/roles.routes';
import { schoolsRoutes } from '@modules/schools/infra/http/routes/schools.routes';
import { sessionsRoutes } from '@modules/sessions/infra/http/routes/sessions.routes';
import { subjectsRoutes } from '@modules/subjects/infra/http/routes/subjects.routes';
import { usersRoutes } from '@modules/users/infra/http/routes/users.routes';
import { userTokensRoutes } from '@modules/users/infra/http/routes/userTokens.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/users', userTokensRoutes);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/roles', rolesRoutes);
routes.use('/schools', schoolsRoutes);
routes.use('/grades', gradesRoutes);
routes.use('/subjects', subjectsRoutes);

export { routes };
