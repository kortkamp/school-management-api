import { celebrate, Joi, Segments } from 'celebrate';
import { listWithFilterSchema } from 'typeorm-dynamic-filters';

export const createUserValidate = celebrate(
  {
    [Segments.BODY]: {
      name: Joi.string().min(3).max(100).required(),
      email: Joi.string().email().trim().lowercase().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),

      tenant_name: Joi.string().min(3).max(100).required(),
      school_name: Joi.string().min(3).max(100).required(),
    },
  },
  {
    abortEarly: false,
  },
);

export const findByCPFValidate = celebrate({
  [Segments.PARAMS]: {
    CPF: Joi.string().trim().length(11).required(),
  },
});

export const confirmUserValidate = celebrate({
  [Segments.QUERY]: {
    token: Joi.string().uuid().required(),
  },
});

export const forgotPasswordValidate = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().trim().required(),
  },
});

export const resetPasswordValidate = celebrate({
  [Segments.BODY]: {
    token: Joi.string().uuid().required(),
    password: Joi.string().required(),
    password_confirmation: Joi.string().required().valid(Joi.ref('password')),
  },
});

export const updateUserValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).max(100),
    email: Joi.string().email().trim().lowercase(),
    enroll_id: Joi.string().min(3),
    CPF: Joi.string().min(11).max(14),
    phone: Joi.string().min(10).max(13),
    sex: Joi.string().valid('M', 'F'),
    birth: Joi.string().isoDate(),
    role_id: Joi.string().uuid(),
    school_id: Joi.string().uuid(),
    active: Joi.boolean(),
    old_password: Joi.string(),
    password: Joi.string(),
  }).and('password', 'old_password'),
});

export const listUserValidate = celebrate({
  [Segments.QUERY]: listWithFilterSchema,
});
