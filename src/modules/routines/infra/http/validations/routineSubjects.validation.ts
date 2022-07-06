import { celebrate, Joi, Segments } from 'celebrate';

export const createRoutineSubjectValidate = celebrate(
  {
    [Segments.BODY]: {
      routine_subjects: Joi.array().items({
        routine_id: Joi.string().uuid().required(),
        subject_id: Joi.string().uuid().required(),
        class_group_id: Joi.string().uuid().required(),
        week_day: Joi.number().integer().min(0).max(6).required(),
      }),
    },
  },
  {
    abortEarly: false,
  },
);

export const deleteRoutineSubjectValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});
