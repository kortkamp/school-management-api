import { MessageType } from '@modules/messages/models/IMessage';
import { celebrate, Joi, Segments } from 'celebrate';
import { listWithFilterSchema } from 'typeorm-dynamic-filters';

export const createMessageValidate = celebrate(
  {
    [Segments.BODY]: {
      type: Joi.string()
        .valid(...Object.values(MessageType), '', null)
        .empty('')
        .default(MessageType.STANDARD),

      user_id: Joi.when('school_id', {
        then: Joi.not().forbidden(),
        otherwise: Joi.string().uuid().required(),
      }),

      school_id: Joi.string().uuid(),

      title: Joi.string().max(100).required(),

      text: Joi.string().max(1000).required(),

      link: Joi.string().max(255).required(),
    },
  },
  {
    abortEarly: false,
  },
);

export const deleteMessageValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const showMessageValidate = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
});

export const listMessagesValidate = celebrate({
  [Segments.QUERY]: listWithFilterSchema,
});
