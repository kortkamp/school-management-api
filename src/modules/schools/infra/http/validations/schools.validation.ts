import { celebrate, Joi, Segments } from 'celebrate';

export const createSchoolValidate = celebrate(
  {
    [Segments.BODY]: {
      name: Joi.string().min(3).max(100).required(),
      full_name: Joi.string()
        .min(3)
        .max(100)
        .empty('')
        .default(null)
        .allow(null),
      CNPJ: Joi.string().length(14).empty('').default(null).allow(null),
      email: Joi.string().email().empty('').default(null).allow(null),
      phone: Joi.string().length(10).empty('').default(null).allow(null),
      mobile: Joi.string().length(11).empty('').default(null).allow(null),

      street: Joi.string().min(3).max(100).required(),
      number: Joi.string().min(1).max(20).required(),
      complement: Joi.string().max(50).allow(''),
      district: Joi.string().min(1).max(20).required(),
      city: Joi.string().min(1).max(50).required(),
      state: Joi.string().length(2).required(),
      CEP: Joi.string().length(8).required(),
    },
  },
  {
    abortEarly: false,
  },
);

export const deleteSchoolValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const showSchoolValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const updateSchoolValidate = celebrate(
  {
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().min(3).max(100).required(),
      full_name: Joi.string()
        .min(3)
        .max(100)
        .empty('')
        .default(null)
        .allow(null),
      CNPJ: Joi.string().length(14).empty('').default(null).allow(null),
      email: Joi.string().email().empty('').default(null).allow(null),
      phone: Joi.string().length(10).empty('').default(null).allow(null),
      mobile: Joi.string().length(11).empty('').default(null).allow(null),

      street: Joi.string().min(3).max(100).required(),
      number: Joi.string().min(1).max(20).required(),
      complement: Joi.string().max(50).allow(''),
      district: Joi.string().min(1).max(20).required(),
      city: Joi.string().min(1).max(50).required(),
      state: Joi.string().length(2).required(),
      CEP: Joi.string().length(8).required(),
    },
  },
  {
    abortEarly: false,
  },
);
