import { celebrate, Joi, Segments } from 'celebrate';
import { listWithFilterSchema } from 'typeorm-dynamic-filters';

export const createStudentValidate = celebrate(
  {
    [Segments.BODY]: {
      name: Joi.string().min(3).max(100).required(),
      email: Joi.string().email().trim().lowercase(),
      enroll_id: Joi.string().required(),
      CPF: Joi.string().min(11).max(14),
      phone: Joi.string().min(10).max(13),
      sex: Joi.string().valid('M', 'F').required(),
      birth: Joi.string().isoDate().required(),

      segment_id: Joi.string().uuid(),
      grade_id: Joi.string().uuid(),
      class_group_id: Joi.string().uuid(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
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
