import { RoutineType } from '@modules/routines/models/IRoutine';
import { celebrate, Joi, Segments } from 'celebrate';

export const createRoutineGroupValidate = celebrate(
  {
    [Segments.BODY]: {
      name: Joi.string().max(100).required().allow(''),
      routines: Joi.array().items({
        start_at: Joi.string().required(),
        duration: Joi.string().required(),
        type: Joi.string()
          .valid(...Object.values(RoutineType))
          .required(),
      }),
    },
  },
  {
    abortEarly: false,
  },
);

export const deleteRoutineGroupValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const showRoutineGroupValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const updateRoutineGroupValidate = celebrate(
  {
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().min(1).max(100).required(),
      routines: Joi.array().items({
        id: Joi.string().uuid().required(),
        start_at: Joi.string().required(),
        duration: Joi.string().required(),
        type: Joi.string()
          .valid(...Object.values(RoutineType))
          .required(),
      }),
    },
  },
  {
    abortEarly: false,
  },
);
