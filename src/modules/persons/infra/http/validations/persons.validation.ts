import { celebrate, Joi, Segments } from 'celebrate';

export const createPersonValidate = celebrate(
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

export const deletePersonValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const showPersonValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const updatePersonValidate = celebrate(
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
