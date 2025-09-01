import { celebrate, Joi, Segments } from 'celebrate';

export const quiebraIntSchema = Joi.object({
  id_quiebre: Joi.number().required(),
  medida: Joi.string().required(),
  descripcion: Joi.string().required(),
  cod_empresa: Joi.number().required(),
  id_usuario: Joi.number().required(),
  id_caballete: Joi.number().required(),
});

export const quiebraIntValidate = celebrate({
  [Segments.BODY]: quiebraIntSchema,
});