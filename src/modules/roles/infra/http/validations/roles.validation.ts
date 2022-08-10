import { RoleTypes } from '@modules/roles/models/IRole';
import { celebrate, Joi, Segments } from 'celebrate';

export const createRoleValidate = celebrate(
  {
    [Segments.BODY]: {
      name: Joi.string().min(3).max(100).required(),
      type: Joi.string()
        .valid(...Object.values(RoleTypes))
        .required(),
    },
  },
  {
    abortEarly: false,
  },
);

export const deleteRoleValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const showRoleValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const updateRoleValidate = celebrate(
  {
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().min(3).max(100).required(),
      type: Joi.string().valid(...Object.values(RoleTypes)),
    },
  },
  {
    abortEarly: false,
  },
);
