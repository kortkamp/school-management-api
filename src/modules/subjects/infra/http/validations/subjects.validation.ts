import { celebrate, Joi, Segments } from 'celebrate';

export const createSubjectValidate = celebrate(
  {
    [Segments.BODY]: {
      name: Joi.string().min(3).max(100).required(),
    },
  },
  {
    abortEarly: false,
  },
);

export const deleteSubjectValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const showSubjectValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const updateSubjectValidate = celebrate(
  {
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().min(3).max(100),
    },
  },
  {
    abortEarly: false,
  },
);
