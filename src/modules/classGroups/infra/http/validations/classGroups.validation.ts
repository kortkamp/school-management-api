import { celebrate, Joi, Segments } from 'celebrate';

export const createClassGroupValidate = celebrate(
  {
    [Segments.BODY]: {
      name: Joi.string().min(3).max(100).required(),
      course_id: Joi.string().uuid().required(),
      grade_id: Joi.string().uuid().required(),
      routine_group_id: Joi.string().uuid().required(),
    },
  },
  {
    abortEarly: false,
  },
);

export const deleteClassGroupValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const showClassGroupValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const updateClassGroupValidate = celebrate(
  {
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().min(3).max(100).required(),
      course_id: Joi.string().uuid().required(),
      grade_id: Joi.string().uuid().required(),
      routine_group_id: Joi.string().uuid().required(),
    },
  },
  {
    abortEarly: false,
  },
);
