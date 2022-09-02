import { celebrate, Joi, Segments } from 'celebrate';

export const createSchoolYearValidate = celebrate(
  {
    [Segments.BODY]: {
      name: Joi.string().min(3).max(100).required(),
      start_at: Joi.string().isoDate().required(),
      end_at: Joi.string().isoDate().required(),
    },
  },
  {
    abortEarly: false,
  },
);

export const deleteSchoolYearValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const closeSchoolYearValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const showSchoolYearValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const updateSchoolYearValidate = celebrate(
  {
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().min(3).max(100).required(),
      start_at: Joi.string().isoDate().required(),
      end_at: Joi.string().isoDate().required(),
    },
  },
  {
    abortEarly: false,
  },
);
