import { celebrate, Joi, Segments } from 'celebrate';

export const createTeacherValidate = celebrate(
  {
    [Segments.BODY]: {
      person_id: Joi.string().uuid().required(),
    },
  },
  {
    abortEarly: false,
  },
);

export const deleteTeacherValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const showTeacherValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const updateTeacherValidate = celebrate(
  {
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: { active: Joi.boolean() },
  },
  {
    abortEarly: false,
  },
);

export const listTeachersValidate = celebrate({
  [Segments.QUERY]: {
    active: Joi.boolean(),
    page: Joi.number().positive(),
    per_page: Joi.number().positive(),
    orderBy: Joi.string(),
    orderType: Joi.string().valid('ASC', 'DESC'),
  },
});
