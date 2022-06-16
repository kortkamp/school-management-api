import { celebrate, Joi, Segments } from 'celebrate';

export const createTeacherSubjectValidate = celebrate(
  {
    [Segments.BODY]: {
      teacher_id: Joi.string().uuid().required(),
      subjects_ids: Joi.array().items(Joi.string().uuid().required()),
    },
  },
  {
    abortEarly: false,
  },
);

export const deleteTeacherSubjectValidate = celebrate({
  [Segments.BODY]: {
    teacher_id: Joi.string().uuid().required(),
    subject_id: Joi.string().uuid().required(),
  },
});
