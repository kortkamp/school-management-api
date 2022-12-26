import { celebrate, Joi, Segments } from 'celebrate';
import { listWithFilterSchema } from 'typeorm-dynamic-filters';

export const createAttendanceResultValidate = celebrate(
  {
    [Segments.BODY]: {
      attendance_id: Joi.string().uuid().required(),
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

export const deleteAttendanceResultValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const showAttendanceResultValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const updateAttendanceResultValidate = celebrate(
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

export const listAttendanceResultsValidate = celebrate({
  [Segments.QUERY]: listWithFilterSchema,
});
