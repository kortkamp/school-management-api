import { celebrate, Joi, Segments } from 'celebrate';
import { listWithFilterSchema } from 'typeorm-dynamic-filters';

export const createTeacherClassValidate = celebrate(
  {
    [Segments.BODY]: {
      teacher_id: Joi.string().uuid().required(),
      class_group_id: Joi.string().uuid().required(),
      subject_ids: Joi.array().items(Joi.string().uuid().required()).required(),
    },
  },
  {
    abortEarly: false,
  },
);

export const deleteTeacherClassValidate = celebrate(
  {
    [Segments.BODY]: {
      teacher_id: Joi.string().uuid().required(),
      class_group_id: Joi.string().uuid().required(),
      subject_id: Joi.string().uuid().required(),
    },
  },
  {
    abortEarly: false,
  },
);

export const listTeacherClassesValidate = celebrate({
  [Segments.QUERY]: listWithFilterSchema,
});
