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

export const updateTeacherClassesValidate = celebrate(
  {
    [Segments.BODY]: {
      teacherClasses: Joi.array().items({
        id: Joi.string().uuid().required(),
        routines: Joi.array().items({
          week_day: Joi.number().min(0).max(6).required(),
          routine_id: Joi.string().uuid().required(),
        }),
      }),
    },
  },
  {
    abortEarly: false,
  },
);
