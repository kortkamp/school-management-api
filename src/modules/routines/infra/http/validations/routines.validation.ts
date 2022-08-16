import { celebrate, Joi, Segments } from 'celebrate';

export const createRoutineValidate = celebrate(
  {
    [Segments.BODY]: {
      routine_group_id: Joi.string().uuid().required(),
      start_at: Joi.string().required(),
      end_at: Joi.string().required(),
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
      start_at: Joi.string().required(),
      end_at: Joi.string().required(),
    },
  },
  {
    abortEarly: false,
  },
);
