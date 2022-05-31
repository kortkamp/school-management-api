import { celebrate, Joi, Segments } from 'celebrate';
import { listWithFilterSchema } from 'typeorm-dynamic-filters';

export const createExamResultValidate = celebrate(
  {
    [Segments.BODY]: {
      exam_id: Joi.string().uuid().required(),
      results: Joi.array().items({
        student_id: Joi.string().uuid().required(),
        value: Joi.number().integer().required(),
      }),
    },
  },
  {
    abortEarly: false,
  },
);

export const deleteExamResultValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const showExamResultValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const updateExamResultValidate = celebrate(
  {
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      type: Joi.string().required(),
      value: Joi.number().integer().required(),
      weight: Joi.number().integer().required(),
      date: Joi.string().isoDate().required(),
    },
  },
  {
    abortEarly: false,
  },
);

export const listExamResultsValidate = celebrate({
  [Segments.QUERY]: listWithFilterSchema,
});
