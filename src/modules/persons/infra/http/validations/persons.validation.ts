import { celebrate, Joi, Segments } from 'celebrate';

export const createPersonValidate = celebrate(
  {
    [Segments.BODY]: {
      name: Joi.string().min(3).max(100).required(),
      cpf: Joi.string().length(11).empty('').default(null).allow(null),
      rg: Joi.string().min(2).max(20).empty('').default(null).allow(null),
      sex: Joi.string().valid('M', 'F').required(),
      birth: Joi.string().empty('').default(null).allow(null),
      role_id: Joi.string().uuid().empty('').default(null).allow(null),
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

export const findByCpfValidate = celebrate({
  [Segments.PARAMS]: {
    cpf: Joi.string().length(11).required(),
  },
});

export const updatePersonValidate = celebrate(
  {
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().min(3).max(100),
      cpf: Joi.string().length(11).empty('').default(null).allow(null),
      rg: Joi.string().min(2).max(20).empty('').default(null).allow(null),
      sex: Joi.string().valid('M', 'F'),
      birth: Joi.string().isoDate(),
    },
  },
  {
    abortEarly: false,
  },
);
