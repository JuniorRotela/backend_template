import { celebrate, Joi, Segments } from 'celebrate';

export const problemaLavadoraSchema = Joi.object({
  serie_stock: Joi.string().required(),
  id_problema: Joi.number().required(),
  problemaanterior: Joi.string(),
  obs: Joi.string(),  
  estado_problema: Joi.string(),
  imagenes: Joi.string(),
  id_usuario: Joi.number().required(),
  orden_produccion: Joi.string(),
  id_producto: Joi.number(),
});

export const reporteLavadoraValidate = celebrate({
  [Segments.BODY]: problemaLavadoraSchema,
});