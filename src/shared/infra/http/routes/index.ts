import { classGroupsRoutes } from '@modules/classGroups/infra/http/routes/classGroups.routes';
import { teacherClassesRoutes } from '@modules/classGroups/infra/http/routes/teacherClasses.routes';
import { examsRoutes } from '@modules/exams/infra/http/routes/exams.routes';
import { gradesRoutes } from '@modules/grades/infra/http/routes/grades.routes';
import { rolesRoutes } from '@modules/roles/infra/http/routes/roles.routes';
import { routinesRoutes } from '@modules/routines/infra/http/routes/routines.routes';
import { schoolsRoutes } from '@modules/schools/infra/http/routes/schools.routes';
import { segmentsRoutes } from '@modules/segments/infra/http/routes/segments.routes';
import { sessionsRoutes } from '@modules/sessions/infra/http/routes/sessions.routes';
import { studentsRoutes } from '@modules/students/infra/http/routes/students.routes';
import { subjectsRoutes } from '@modules/subjects/infra/http/routes/subjects.routes';
import { userSubjectsRoutes } from '@modules/subjects/infra/http/routes/userSubjects.routes';
import { teachersRoutes } from '@modules/teachers/infra/http/routes/teachers.routes';
import { termsRoutes } from '@modules/terms/infra/http/routes/terms.routes';
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
routes.use('/user-subjects', userSubjectsRoutes);
routes.use('/segments', segmentsRoutes);
routes.use('/class-groups', classGroupsRoutes);
routes.use('/exams', examsRoutes);
routes.use('/teacher-classes', teacherClassesRoutes);
routes.use('/students', studentsRoutes);
routes.use('/teachers', teachersRoutes);
routes.use('/terms', termsRoutes);
routes.use('/routines', routinesRoutes);

export { routes };
