import { celebrate, Joi, Segments } from 'celebrate';

export const stockSchema = Joi.object({
  cod: Joi.string().required(),
  descripcion: Joi.string().required(),
  cantidad: Joi.number().required(),
  medidas: Joi.string().required(),
  id_caballete: Joi.number().required(),
  obs: Joi.string(),
  serie: Joi.string().required(),
  cantidad_entrada: Joi.number().required(),
  id_proveedor: Joi.number().required(),
  id_categoria: Joi.number(),
  id_usuario: Joi.number().required(),
});

export const stockValidate = celebrate({
  [Segments.BODY]: stockSchema,
});