import { celebrate, Joi, Segments } from 'celebrate';

export const createCourseValidate = celebrate(
  {
    [Segments.BODY]: {
      name: Joi.string().min(3).max(100).required(),
      segment_id: Joi.string().uuid().required(),
      total_hours: Joi.number().integer().positive().required(),
      phase_name: Joi.string().required(),
      phases_number: Joi.number().integer().positive().required(),
      grades: Joi.array()
        .items({
          id: Joi.string().uuid(),
          name: Joi.string().required(),
          total_hours: Joi.number().integer().positive().required(),
          days: Joi.number().integer().positive().required(),
          class_groups: Joi.array().items({
            id: Joi.string(),
            name: Joi.string().required(),
          }),
        })
        .required(),
    },
  },
  {
    abortEarly: false,
  },
);

export const deleteCourseValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const showCourseValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const updateCourseValidate = celebrate(
  {
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().min(3).max(100).required(),
      segment_id: Joi.string().uuid().required(),
      total_hours: Joi.number().integer().positive().required(),
      phase_name: Joi.string().required(),
      phases_number: Joi.number().integer().positive().required(),
      grades: Joi.array().items({
        id: Joi.string(),
        name: Joi.string().required(),
        total_hours: Joi.number().integer().positive().required(),
        days: Joi.number().integer().positive().required(),
        class_groups: Joi.array().items({
          id: Joi.string(),
          name: Joi.string().required(),
        }),
      }),
    },
  },
  {
    abortEarly: false,
  },
);
