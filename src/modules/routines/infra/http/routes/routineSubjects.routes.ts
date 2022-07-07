import { ensureRoles } from '@modules/roles/infra/http/middlewares/ensureRoles';
import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { RoutineSubjectsController } from '../controllers/RoutineSubjectsController';
import {
  createRoutineSubjectValidate,
  deleteRoutineSubjectValidate,
  listRoutineSubjectValidate,
} from '../validations/routineSubjects.validation';

const routineSubjectsRoutes = Router();

routineSubjectsRoutes.use(authMiddleware);

const routineSubjectsController = new RoutineSubjectsController();

routineSubjectsRoutes.get('/teacher', routineSubjectsController.indexByTeacher);

routineSubjectsRoutes.get(
  '/class-group/:id',
  listRoutineSubjectValidate,
  routineSubjectsController.indexByClassGroup,
);

routineSubjectsRoutes.use(ensureRoles(['admin']));

routineSubjectsRoutes.post(
  '/',
  createRoutineSubjectValidate,
  routineSubjectsController.create,
);

// routineSubjectsRoutes.delete(
//   '/:id',
//   deleteRoutineSubjectValidate,
//   routineSubjectsController.delete,
// );

// routineSubjectsRoutes.put(
//   '/:id',
//   updateRoutineSubjectValidate,
//   routineSubjectsController.update,
// );

export { routineSubjectsRoutes };
