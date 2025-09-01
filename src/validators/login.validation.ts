import { celebrate, Joi, Segments } from 'celebrate';

export const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const loginValidate = celebrate({
  [Segments.BODY]: loginSchema,
});