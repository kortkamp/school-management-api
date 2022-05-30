import { celebrate, Joi, Segments } from 'celebrate';

export const userSubjectValidate = celebrate(
  {
    [Segments.BODY]: {
      user_id: Joi.string().uuid().required(),
      subject_id: Joi.string().uuid().required(),
    },
  },
  {
    abortEarly: false,
  },
);
