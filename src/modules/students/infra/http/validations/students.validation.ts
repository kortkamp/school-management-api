import { celebrate, Joi, Segments } from 'celebrate';
import { listWithFilterSchema } from 'typeorm-dynamic-filters';

export const createStudentValidate = celebrate(
  {
    [Segments.BODY]: {
      name: Joi.string().min(3).max(100).required(),
      email: Joi.string().email().trim().lowercase().allow(''),
      enroll_id: Joi.string().required(),
      CPF: Joi.string().min(11).max(14).allow(''),
      phone: Joi.string().min(10).max(13),
      sex: Joi.string().valid('M', 'F').required(),
      birth: Joi.string().isoDate().required(),

      segment_id: Joi.string().uuid().empty('').default(null).allow(null),
      grade_id: Joi.string().uuid().empty('').default(null).allow(null),
      class_group_id: Joi.string().uuid().empty('').default(null).allow(null),
      password: Joi.string().allow(''),
      password_confirmation: Joi.string().valid(Joi.ref('password')).optional(),
    },
  },
  {
    abortEarly: false,
  },
);

export const deleteStudentValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const showStudentValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const updateStudentValidate = celebrate(
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

export const listStudentsValidate = celebrate({
  [Segments.QUERY]: listWithFilterSchema,
});
