import { celebrate, Joi, Segments } from 'celebrate';
import { listWithFilterSchema } from 'typeorm-dynamic-filters';

export const createEmployeeValidate = celebrate(
  {
    [Segments.BODY]: {
      name: Joi.string().min(3).max(100).required(),
      CPF: Joi.string().min(11).max(14).required(),
      sex: Joi.string().valid('M', 'F').required(),
      birth: Joi.string().isoDate().required(),

      address: Joi.object({
        street: Joi.string().min(3).max(100).required(),
        number: Joi.string().min(1).max(20).required(),
        complement: Joi.string().max(30).required().allow(''),
        district: Joi.string().min(1).max(20).required(),
        city: Joi.string().min(1).max(20).required(),
        state: Joi.string().length(2).required(),
        CEP: Joi.string().length(8).required(),
      }).required(),

      email: Joi.string().email().trim().lowercase().required(),
      phone: Joi.string().min(10).max(13),

      role_id: Joi.string().uuid().required(),
    },
  },
  {
    abortEarly: false,
  },
);

export const deleteEmployeeValidate = celebrate(
  {
    [Segments.BODY]: {
      role_id: Joi.string().uuid().required(),
      user_id: Joi.string().uuid().required(),
    },
  },
  {
    abortEarly: false,
  },
);

export const showEmployeeValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const updateEmployeeValidate = celebrate(
  {
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {},
  },
  {
    abortEarly: false,
  },
);

export const createEmployeeRoleValidate = celebrate(
  {
    [Segments.BODY]: {
      employee_id: Joi.string().uuid().required(),
      role_id: Joi.string().uuid().required(),
      prev_role_id: Joi.string().uuid().empty('').default(null).allow(null),
    },
  },
  {
    abortEarly: false,
  },
);

export const listEmployeesValidate = celebrate({
  [Segments.QUERY]: listWithFilterSchema,
});
