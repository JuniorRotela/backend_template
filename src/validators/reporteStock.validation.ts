import { celebrate, Joi, Segments } from 'celebrate';

export const problemaStockSchema = Joi.object({
  cod_paquete: Joi.string().required(),
  cantidad: Joi.number().required(),
  serie: Joi.string(),
  estado_paquete: Joi.string(),
  cantidad_problema: Joi.number().required(),
  imagen: Joi.string(),
  id_problema: Joi.string().required(),
  id_usuario: Joi.number().required(),
  id_producto: Joi.number(),
  obs: Joi.string(),
});

export const reporteStockValidate = celebrate({
  [Segments.BODY]: problemaStockSchema,
});