import { authMiddleware } from '@modules/sessions/infra/http/middlewares/authMiddleware';
import { Router } from 'express';

import { CoursesController } from '../controllers/CoursesController';
import {
  createCourseValidate,
  deleteCourseValidate,
  showCourseValidate,
  updateCourseValidate,
} from '../validations/courses.validation';

const coursesRoutes = Router();

coursesRoutes.use(authMiddleware);

const coursesController = new CoursesController();

coursesRoutes.post('/', createCourseValidate, coursesController.create);

coursesRoutes.get('/', coursesController.index);

coursesRoutes.delete('/:id', deleteCourseValidate, coursesController.delete);

coursesRoutes.put('/:id', updateCourseValidate, coursesController.update);

coursesRoutes.get('/:id', showCourseValidate, coursesController.show);

export { coursesRoutes };
