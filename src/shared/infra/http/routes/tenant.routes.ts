import { classGroupsRoutes } from '@modules/classGroups/infra/http/routes/classGroups.routes';
import { teacherClassesRoutes } from '@modules/classGroups/infra/http/routes/teacherClasses.routes';
import { examsRoutes } from '@modules/exams/infra/http/routes/exams.routes';
import { gradesRoutes } from '@modules/grades/infra/http/routes/grades.routes';
import { routinesRoutes } from '@modules/routines/infra/http/routes/routines.routes';
import { segmentsRoutes } from '@modules/segments/infra/http/routes/segments.routes';
import { studentsRoutes } from '@modules/students/infra/http/routes/students.routes';
import { subjectsRoutes } from '@modules/subjects/infra/http/routes/subjects.routes';
import { userSubjectsRoutes } from '@modules/subjects/infra/http/routes/userSubjects.routes';
import { teachersRoutes } from '@modules/teachers/infra/http/routes/teachers.routes';
import { termsRoutes } from '@modules/terms/infra/http/routes/terms.routes';
import { Router } from 'express';

const tenantRoutes = Router();

tenantRoutes.use('/grades', gradesRoutes);
tenantRoutes.use('/subjects', subjectsRoutes);
tenantRoutes.use('/user-subjects', userSubjectsRoutes);
tenantRoutes.use('/segments', segmentsRoutes);
tenantRoutes.use('/class-groups', classGroupsRoutes);
tenantRoutes.use('/exams', examsRoutes);
tenantRoutes.use('/teacher-classes', teacherClassesRoutes);
tenantRoutes.use('/students', studentsRoutes);
tenantRoutes.use('/teachers', teachersRoutes);
tenantRoutes.use('/terms', termsRoutes);
tenantRoutes.use('/routines', routinesRoutes);

export { tenantRoutes };
