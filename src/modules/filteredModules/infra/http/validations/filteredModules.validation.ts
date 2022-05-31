import { celebrate, Joi, Segments } from 'celebrate';
import { listWithFilterSchema } from 'typeorm-dynamic-filters';

export const createFilteredModuleValidate = celebrate(
  {
    [Segments.BODY]: {
      type: Joi.string().required(),
      value: Joi.number().integer().required(),
      weight: Joi.number().integer().required(),
      subject_id: Joi.string().uuid().required(),
      class_id: Joi.string().uuid().required(),
      date: Joi.string().isoDate().required(),
    },
  },
  {
    abortEarly: false,
  },
);

export const deleteFilteredModuleValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const showFilteredModuleValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const updateFilteredModuleValidate = celebrate(
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

export const listFilteredModulesValidate = celebrate({
  [Segments.QUERY]: listWithFilterSchema,
});
