import { celebrate, Joi, Segments } from 'celebrate';

export const precioSchema = Joi.object({
  descripcion: Joi.string().required(),
  precio:Joi.number().required(),
  cod_empresa:Joi.number().required(),
  id_usuario:Joi.number().required()
});

export const precioValidate = celebrate({
  [Segments.BODY]: precioSchema,
});