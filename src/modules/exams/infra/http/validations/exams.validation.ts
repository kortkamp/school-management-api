import { celebrate, Joi, Segments } from 'celebrate';
import { listWithFilterSchema } from 'typeorm-dynamic-filters';

export const createExamValidate = celebrate(
  {
    [Segments.BODY]: {
      type: Joi.string().required(),
      value: Joi.number().integer().required(),
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
