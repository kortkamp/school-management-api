import { celebrate, Joi, Segments } from 'celebrate';

export const teacherClassValidate = celebrate(
  {
    [Segments.BODY]: {
      teacher_id: Joi.string().uuid().required(),
      class_group_id: Joi.string().uuid().required(),
    },
  },
  {
    abortEarly: false,
  },
);
