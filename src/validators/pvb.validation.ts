import { celebrate, Joi, Segments } from 'celebrate';

export const pvbSchema = Joi.object({
  descripcion: Joi.string(),
  dimensiones: Joi.string().required(),
  codigo: Joi.string().required(),
  cod: Joi.string().required(),
  // serie: Joi.string().required(),
});

export const pvbValidate = celebrate({
  [Segments.BODY]: pvbSchema,
});