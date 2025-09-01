import { celebrate, Joi, Segments } from 'celebrate';

export const problemaCalandraSchema = Joi.object({
  id_problemacalandra: Joi.string().required(),
  entroproblema: Joi.string().required(),
  obs: Joi.string(),
  serie: Joi.string(),
  producto: Joi.string(),
  imagenes: Joi.string(),
  id_usuario: Joi.number().required(),
});

export const reporteCalandraValidate = celebrate({
  [Segments.BODY]: problemaCalandraSchema,
});