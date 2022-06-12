import { celebrate, Joi, Segments } from 'celebrate';
import { listWithFilterSchema } from 'typeorm-dynamic-filters';

export const createTeacherValidate = celebrate(
  {
    [Segments.BODY]: {
      name: Joi.string().min(3).max(100).required(),
      email: Joi.string().email().trim().lowercase(),
      enroll_id: Joi.string().required(),
      CPF: Joi.string().min(11).max(14),
      phone: Joi.string().min(10).max(13),
      sex: Joi.string().valid('M', 'F').required(),
      birth: Joi.string().isoDate().required(),

      segment_id: Joi.string().uuid().empty('').default(null).allow(null),
      grade_id: Joi.string().uuid().empty('').default(null).allow(null),
      class_group_id: Joi.string().uuid().empty('').default(null).allow(null),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
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
