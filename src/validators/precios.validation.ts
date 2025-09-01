import { celebrate, Joi, Segments } from 'celebrate';

export const preciosSchema = Joi.object({
  id_producto: Joi.number().required(),
  precios: Joi.number().required(),
  id_usuario:Joi.number().required(),
  cod_empresa: Joi.number().required(),
});

export const preciosValidate = celebrate({
  [Segments.BODY]: preciosSchema,
});