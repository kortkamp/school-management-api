import { ensureRoles } from '@modules/roles/infra/http/middlewares/ensureRoles';
import { RoleTypes } from '@modules/roles/models/IRole';
import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { AttendancesController } from '../controllers/AttendancesController';
import {
  createAttendanceValidate,
  deleteAttendanceValidate,
  listAttendancesByClassSubjectValidate,
  listAttendancesValidate,
  showAttendanceValidate,
  updateAttendanceValidate,
} from '../validations/attendances.validation';
import { attendanceResultsRoutes } from './attendanceResults.routes';

const attendancesRoutes = Router();

attendancesRoutes.use(authMiddleware);

const attendancesController = new AttendancesController();

attendancesRoutes.use('/results', attendanceResultsRoutes);

attendancesRoutes.get(
  '/',
  ensureRoles([RoleTypes.PRINCIPAL, RoleTypes.SECRETARY, RoleTypes.STUDENT]),
  listAttendancesValidate,
  attendancesController.index,
);

// attendancesRoutes.get(
//   '/subject',
//   listAttendancesByClassSubjectValidate,
//   attendancesController.listByClassSubject,
// );

attendancesRoutes.post(
  '/',
  ensureRoles([RoleTypes.TEACHER]),
  createAttendanceValidate,
  attendancesController.create,
);

attendancesRoutes.get(
  '/teacher',
  ensureRoles([RoleTypes.TEACHER]),
  listAttendancesValidate,
  attendancesController.indexByTeacher,
);

attendancesRoutes.delete(
  '/:id',
  ensureRoles([RoleTypes.TEACHER]),
  deleteAttendanceValidate,
  attendancesController.delete,
);

attendancesRoutes.put(
  '/:id',
  ensureRoles([RoleTypes.TEACHER]),
  updateAttendanceValidate,
  attendancesController.update,
);

attendancesRoutes.get('/:id', showAttendanceValidate, attendancesController.show);

export { attendancesRoutes };
