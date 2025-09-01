import { celebrate, Joi, Segments } from 'celebrate';

export const caballeteSchema = Joi.object({
  codigo: Joi.string().required(),
  descripcion: Joi.string(),
});

export const caballeteValidate = celebrate({
  [Segments.BODY]: caballeteSchema,
});