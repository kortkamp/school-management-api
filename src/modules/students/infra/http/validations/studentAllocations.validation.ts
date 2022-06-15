import { celebrate, Joi, Segments } from 'celebrate';

export const updateStudentAllocationValidate = celebrate(
  {
    [Segments.BODY]: {
      user_id: Joi.string().uuid(),
      segment_id: Joi.string().uuid(),
      grade_id: Joi.string().uuid(),
      class_group_id: Joi.string().uuid(),
    },
  },
  {
    abortEarly: false,
  },
);
