import { celebrate, Joi, Segments } from 'celebrate';

export const levelSchema = Joi.object({
  descripcion: Joi.string().required(),
});

export const levelValidate = celebrate({
  [Segments.BODY]: levelSchema,
});