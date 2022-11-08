import { celebrate, Joi, Segments } from 'celebrate';

export const createStudentValidate = celebrate(
  {
    [Segments.BODY]: {
      name: Joi.string().min(3).max(100).required(),
      cpf: Joi.string().length(11),
      rg: Joi.string().min(2).max(20),
      sex: Joi.string().valid('M', 'F').required(),
      birth: Joi.string().required(),
      addresses: Joi.array().items({
        street: Joi.string().min(3).max(100).required(),
        number: Joi.string().min(1).max(20).required(),
        complement: Joi.string().max(30).required().allow(''),
        district: Joi.string().min(1).max(20).required(),
        city: Joi.string().min(1).max(40).required(),
        state: Joi.string().length(2).required(),
        CEP: Joi.string().length(8).required(),
      }),
      contact: Joi.object({
        email: Joi.string().email().empty('').default(null).allow(null),
        phone: Joi.string().length(10).empty('').default(null).allow(null),
        cel_phone: Joi.string().length(11).empty('').default(null).allow(null),
      }),
      enroll_id: Joi.string().empty('').default(null).allow(null),
      course_id: Joi.string().uuid().empty('').default(null).allow(null),
      grade_id: Joi.string().uuid().empty('').default(null).allow(null),
      class_group_id: Joi.string().uuid().empty('').default(null).allow(null),
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
    [Segments.BODY]: {
      enroll_id: Joi.string(),
      course_id: Joi.string().uuid().empty('').default(null).allow(null),
      grade_id: Joi.string().uuid().empty('').default(null).allow(null),
      class_group_id: Joi.string().empty('').default(null).allow(null),
    },
  },
  {
    abortEarly: false,
  },
);

export const listStudentsValidate = celebrate({
  [Segments.QUERY]: {
    page: Joi.number().positive(),
    per_page: Joi.number().positive(),
    school_id: Joi.string().uuid(),
    course_id: Joi.string().uuid().empty('').default(null).allow(null),
    grade_id: Joi.string().uuid().empty('').default(null).allow(null),
    class_group_id: Joi.string().uuid().empty('').default(null).allow(null),
  },
});
