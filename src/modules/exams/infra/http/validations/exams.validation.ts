import { examSubType, examType } from '@modules/exams/models/IExam';
import { celebrate, Joi, Segments } from 'celebrate';
import { listWithFilterSchema } from 'typeorm-dynamic-filters';

export const createExamValidate = celebrate(
  {
    [Segments.BODY]: {
      type: Joi.string()
        .required()
        .valid(...Object.values(examType)),
      sub_type: Joi.string()
        .required()
        .valid(...Object.values(examSubType)),
      value: Joi.number().integer().required(),
      reference_id: Joi.string().uuid().empty('').default(null).allow(null),
      weight: Joi.number().integer().required(),
      term_id: Joi.string().uuid().required(),
      subject_id: Joi.string().uuid().required(),
      class_id: Joi.string().uuid().required(),
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
      type: Joi.string().required(),
      value: Joi.number().integer().required(),
      term_id: Joi.string().uuid().required(),
      weight: Joi.number().integer().required(),
      date: Joi.string().isoDate().required(),
    },
  },
  {
    abortEarly: false,
  },
);

export const listExamsValidate = celebrate({
  [Segments.QUERY]: listWithFilterSchema,
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
