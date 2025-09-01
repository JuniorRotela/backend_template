import { celebrate, Joi, Segments } from 'celebrate';

export const problemaDescargaSchema = Joi.object({
  id_problemadescarga: Joi.number().required(),
  // descripcion:Joi.string(),
  obs: Joi.string(),
  codigo_paquete: Joi.string(),
  imagenes:Joi.string(),
});

export const reporteDescargaValidate = celebrate({
  [Segments.BODY]: problemaDescargaSchema,
});