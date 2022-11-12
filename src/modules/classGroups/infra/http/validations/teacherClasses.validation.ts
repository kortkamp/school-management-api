import { celebrate, Joi, Segments } from 'celebrate';

export const createTeacherClassValidate = celebrate(
  {
    [Segments.BODY]: {
      teacher_id: Joi.string().uuid().required(),
      class_group_id: Joi.string().uuid().required(),
      subject_id: Joi.string().uuid().required(),
    },
  },
  {
    abortEarly: false,
  },
);

export const deleteTeacherClassValidate = celebrate(
  {
    [Segments.BODY]: {
      teacher_id: Joi.string().uuid().required(),
      class_group_id: Joi.string().uuid().required(),
      subject_id: Joi.string().uuid().required(),
    },
  },
  {
    abortEarly: false,
  },
);

export const listTeacherClassesValidate = celebrate({
  [Segments.QUERY]: {
    teacher_id: Joi.string().uuid(),
    class_group_id: Joi.string().uuid(),
    subject_id: Joi.string().uuid(),
  },
});
