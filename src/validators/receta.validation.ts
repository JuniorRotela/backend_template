import { celebrate, Joi, Segments } from 'celebrate';

export const recetaSchema = Joi.object({
  descripcion:Joi.string().required(),
  id_usuario: Joi.number().required(),
  cod_empresa: Joi.number().required(),
  data: Joi.array(),
});

export const recetaValidate = celebrate({
  [Segments.BODY]: recetaSchema,
});