import { celebrate, Joi, Segments } from 'celebrate';

export const empresasSchema = Joi.object({
  nombre: Joi.string().required(),
});

export const empresasValidate = celebrate({
  [Segments.BODY]: empresasSchema,
});