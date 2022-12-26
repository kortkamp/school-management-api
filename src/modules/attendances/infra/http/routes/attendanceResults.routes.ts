import { ensureRoles } from '@modules/roles/infra/http/middlewares/ensureRoles';
import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { AttendanceResultsController } from '../controllers/AttendanceResultsController';
import {
  createAttendanceResultValidate,
  deleteAttendanceResultValidate,
  listAttendanceResultsValidate,
  showAttendanceResultValidate,
  updateAttendanceResultValidate,
} from '../validations/attendanceResults.validation';

const attendanceResultsRoutes = Router();

attendanceResultsRoutes.use(authMiddleware);

const attendanceResultsController = new AttendanceResultsController();

attendanceResultsRoutes.post(
  '/',
  ensureRoles(['teacher', 'admin']),
  createAttendanceResultValidate,
  attendanceResultsController.create,
);

attendanceResultsRoutes.get(
  '/',
  listAttendanceResultsValidate,
  attendanceResultsController.index,
);

attendanceResultsRoutes.delete(
  '/:id',
  deleteAttendanceResultValidate,
  attendanceResultsController.delete,
);

attendanceResultsRoutes.put(
  '/:id',
  updateAttendanceResultValidate,
  attendanceResultsController.update,
);

attendanceResultsRoutes.get(
  '/:id',
  showAttendanceResultValidate,
  attendanceResultsController.show,
);

export { attendanceResultsRoutes };
