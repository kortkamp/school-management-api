import { TermType } from '@modules/terms/models/ITerm';
import { celebrate, Joi, Segments } from 'celebrate';

export const createTermValidate = celebrate(
  {
    [Segments.BODY]: {
      name: Joi.string().min(1).max(100),
      type: Joi.string().valid(...Object.values(TermType)),
      start_at: Joi.string().isoDate(),
      end_at: Joi.string().isoDate(),
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
      type: Joi.string()
        .valid(...Object.values(TermType))
        .required(),
      start_at: Joi.string().isoDate().required(),
      end_at: Joi.string().isoDate().required(),
    },
  },
  {
    abortEarly: false,
  },
);
