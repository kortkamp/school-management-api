import { celebrate, Joi, Segments } from 'celebrate';

export const createStudentValidate = celebrate(
  {
    [Segments.BODY]: {
      person_id: Joi.string().uuid(),
      enroll_id: Joi.string().empty('').default(null).allow(null),
      course_id: Joi.string().uuid().empty('').default(null).allow(null),
      grade_id: Joi.string().uuid().empty('').default(null).allow(null),
      class_group_id: Joi.string().uuid().empty('').default(null).allow(null),
      person: Joi.object({
        name: Joi.string().min(3).max(100).required(),
        cpf: Joi.string().length(11).empty('').default(null).allow(null),
        rg: Joi.string().min(2).max(20).empty('').default(null).allow(null),
        sex: Joi.string().valid('M', 'F').required(),
        birth: Joi.string().isoDate().empty('').default(null).allow(null),
      }),
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
      course_id: Joi.string().uuid(),
      grade_id: Joi.string().uuid(),
      class_group_id: Joi.string(),
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
    course_id: Joi.string().uuid(),
    grade_id: Joi.string().uuid(),
    class_group_id: Joi.string().uuid(),
  },
});
