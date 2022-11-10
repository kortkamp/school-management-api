import { examStatus, examType } from '@modules/exams/models/IExam';
import { celebrate, Joi, Segments } from 'celebrate';
import { listWithFilterSchema } from 'typeorm-dynamic-filters';

export const createExamValidate = celebrate(
  {
    [Segments.BODY]: {
      type: Joi.string()
        .required()
        .valid(...Object.values(examType)),

      value: Joi.number().integer().required(),
      term_id: Joi.string().uuid().required(),
      subject_id: Joi.string().uuid().required(),
      class_group_id: Joi.string().uuid().required(),
      date: Joi.string().isoDate().required(),
    },
  },
  {
    abortEarly: false,
  },
);

export const deleteExamValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const showExamValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const updateExamValidate = celebrate(
  {
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      type: Joi.string()
        .required()
        .valid(...Object.values(examType)),
      value: Joi.number().integer(),
      term_id: Joi.string().uuid(),
      weight: Joi.number().integer(),
      date: Joi.string().isoDate(),
    },
  },
  {
    abortEarly: false,
  },
);

export const listExamsValidate = celebrate({
  [Segments.QUERY]: {
    page: Joi.number().positive(),
    per_page: Joi.number().positive(),
    school_id: Joi.string().uuid(),
    status: Joi.string().valid(...Object.values(examStatus)),
    type: Joi.string().valid(...Object.values(examType)),
    class_group_id: Joi.string().uuid(),
  },
});

export const listExamsByClassSubjectValidate = celebrate(
  {
    [Segments.QUERY]: {
      subject_id: Joi.string().uuid().required(),
      class_id: Joi.string().uuid().required(),
    },
  },
  {
    abortEarly: false,
  },
);
