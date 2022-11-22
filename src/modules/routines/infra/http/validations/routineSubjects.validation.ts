import { celebrate, Joi, Segments } from 'celebrate';

export const createRoutineSubjectValidate = celebrate(
  {
    [Segments.BODY]: {
      routine_subjects: Joi.array()
        .min(1)
        .items({
          routine_id: Joi.string().uuid().required(),
          teacher_class_group_id: Joi.string().uuid().required(),
          week_day: Joi.number().integer().min(0).max(6).required(),
        })
        .required(),
    },
  },
  {
    abortEarly: false,
  },
);

export const listRoutineSubjectValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const deleteRoutineSubjectValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});
