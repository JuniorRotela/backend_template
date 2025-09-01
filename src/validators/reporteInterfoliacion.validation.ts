import { celebrate, Joi, Segments } from 'celebrate';

export const problemaInterfoliacionSchema = Joi.object({
  problema: Joi.string().required(),
  obs: Joi.string(),
  imagen: Joi.string(),
  id_usuario: Joi.number().required(),
  serie: Joi.string(),
  estado_problema: Joi.string().required(),
  id_caballete: Joi.number(),
});

export const reporteInterfoliacionValidate = celebrate({
  [Segments.BODY]: problemaInterfoliacionSchema,
});