import { RoutineType } from '@modules/routines/models/IRoutine';
import { celebrate, Joi, Segments } from 'celebrate';

export const createRoutineValidate = celebrate(
  {
    [Segments.BODY]: {
      routine_group_id: Joi.string().uuid().required(),
      type: Joi.string().valid(...Object.values(RoutineType)),
      start_at: Joi.string(),
      duration: Joi.string(),
    },
  },
  {
    abortEarly: false,
  },
);

export const deleteRoutineValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const showRoutineValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const updateRoutineValidate = celebrate(
  {
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      routine_group_id: Joi.string().uuid().required(),
      type: Joi.string()
        .valid(...Object.values(RoutineType))
        .required(),
      start_at: Joi.string().required(),
      duration: Joi.string().required(),
    },
  },
  {
    abortEarly: false,
  },
);
