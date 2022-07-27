import { celebrate, Joi, Segments } from 'celebrate';
import { listWithFilterSchema } from 'typeorm-dynamic-filters';

export const createTeacherValidate = celebrate(
  {
    [Segments.BODY]: {
      name: Joi.string().min(3).max(100).required(),
      CPF: Joi.string().min(11).max(14).required(),
      sex: Joi.string().valid('M', 'F').required(),
      birth: Joi.string().isoDate().required(),

      address: Joi.object({
        street: Joi.string().min(3).max(100).required(),
        number: Joi.string().min(1).max(20).required(),
        complement: Joi.string().min(1).max(20).required(),
        district: Joi.string().min(1).max(20).required(),
        city: Joi.string().min(1).max(20).required(),
        state: Joi.string().length(2).required(),
        CEP: Joi.string().length(8).required(),
      }).required(),

      email: Joi.string().email().trim().lowercase().required(),
      phone: Joi.string().min(10).max(13),
      password: Joi.string().required(),
      password_confirmation: Joi.string().valid(Joi.ref('password')).required(),
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
    [Segments.BODY]: {},
  },
  {
    abortEarly: false,
  },
);

export const listTeachersValidate = celebrate({
  [Segments.QUERY]: listWithFilterSchema,
});
