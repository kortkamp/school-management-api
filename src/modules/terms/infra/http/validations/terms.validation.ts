import { TermType } from '@modules/terms/models/ITerm';
import { celebrate, Joi, Segments } from 'celebrate';

export const createTermValidate = celebrate(
  {
    [Segments.BODY]: {
      terms: Joi.array().items({
        name: Joi.string().min(1).max(100).required(),
        type: Joi.string().valid(...Object.values(TermType)),
        start_at: Joi.string().isoDate().required(),
        end_at: Joi.string().isoDate().required(),
      }),
    },
  },
  {
    abortEarly: false,
  },
);

export const deleteTermValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const showTermValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const updateTermValidate = celebrate(
  {
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().min(1).max(100).required(),
      year: Joi.string().min(4).max(4).required(),
      start_at: Joi.string().isoDate().required(),
      end_at: Joi.string().isoDate().required(),
    },
  },
  {
    abortEarly: false,
  },
);
