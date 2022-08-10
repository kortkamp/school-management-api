import {
  ResultCalculation,
  RecoveringPeriod,
  RecoveringType,
  TermPeriod,
} from '@modules/schools/models/ISchoolParameter';
import { celebrate, Joi, Segments } from 'celebrate';

export const createSchoolParameterValidate = celebrate(
  {
    [Segments.BODY]: {
      result_calculation: Joi.string()
        .valid(...Object.values(ResultCalculation))
        .required(),
      term_period: Joi.string()
        .valid(...Object.values(TermPeriod))
        .required(),
      term_number: Joi.number().integer().positive().required(),
      recovering_period: Joi.string()
        .valid(...Object.values(RecoveringPeriod))
        .required(),
      recovering_type: Joi.string()
        .valid(...Object.values(RecoveringType))
        .required(),
      final_recovering: Joi.string()
        .valid(...Object.values(RecoveringType))
        .empty('')
        .default(null)
        .allow(null),
      class_length: Joi.number().integer().positive().required(),
    },
  },
  {
    abortEarly: false,
  },
);

export const showSchoolParameterValidate = celebrate({
  [Segments.PARAMS]: {
    school_id: Joi.string().uuid().required(),
  },
});

export const updateSchoolParameterValidate = celebrate(
  {
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      result_calculation: Joi.string()
        .valid(...Object.values(ResultCalculation))
        .required(),
      term_period: Joi.string()
        .valid(...Object.values(TermPeriod))
        .required(),
      term_number: Joi.number().integer().positive().required(),
      recovering_period: Joi.string()
        .valid(...Object.values(RecoveringPeriod))
        .required(),
      recovering_type: Joi.string()
        .valid(...Object.values(RecoveringType))
        .required(),
      final_recovering: Joi.string()
        .valid(...Object.values(RecoveringType))
        .empty('')
        .default(null)
        .allow(null),
      class_length: Joi.number().integer().positive().required(),
    },
  },
  {
    abortEarly: false,
  },
);
