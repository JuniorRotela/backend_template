import { celebrate, Joi, Segments } from 'celebrate';

export const interfoliacionSchema = Joi.object({
  id_producto: Joi.number().required(),
  cod: Joi.string().required(),
  descripcion: Joi.string().required(),
  serie: Joi.string().required(),
  id_clasificacion: Joi.number().required(),
  medidas: Joi.string().required(),
  id_caballete: Joi.number().required(),
  defecto: Joi.string().allow(null, ''),
  obs: Joi.string().allow(null, ''),
  motivo: Joi.string().allow(null, ''),
  id_usuario: Joi.number().required(),
  turno: Joi.number().required(),

  id_produccion: Joi.number().required(),

});

export const interfoliacionValidate = celebrate({
  [Segments.BODY]: interfoliacionSchema,
});