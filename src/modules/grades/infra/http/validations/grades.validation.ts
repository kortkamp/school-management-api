import { celebrate, Joi, Segments } from 'celebrate';

export const createGradeValidate = celebrate(
  {
    [Segments.BODY]: {
      name: Joi.string().min(3).max(100).required(),
      segment_id: Joi.string().uuid().required(),
    },
  },
  {
    abortEarly: false,
  },
);

export const deleteGradeValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const showGradeValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const updateGradeValidate = celebrate(
  {
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().min(3).max(100),
      segment_id: Joi.string().uuid(),
    },
  },
  {
    abortEarly: false,
  },
);
