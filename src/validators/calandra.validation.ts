import { celebrate, Joi, Segments } from 'celebrate';
import { JoinAttribute } from 'typeorm/query-builder/JoinAttribute';

export const calandraSchema = Joi.object({
  id_producto: Joi.number().required(),
  cod: Joi.string().required(),
  descripcion: Joi.string().required(),
  serie: Joi.string(),
  id_clasificacion: Joi.number().required(),
  id_categoria: Joi.number().required(),
  medidas: Joi.string().required(),
  cantidad: Joi.number().required(),
  temperatura: Joi.string(),
  id_caballete: Joi.number().required(),
  obs: Joi.string(),
  motivo: Joi.string(),
  id_pvb: Joi.number().required(),
  id_horarios: Joi.number().required(),
  id_usuario: Joi.number().required(),
  // cod_empresa: Joi.number().required(),
  cantidad_entrada: Joi.string(),
  cantidad_utilizada: Joi.string(),
  // cantidad_inutilizada: Joi.number(),
  // id_proveedor: Joi.number().required(),
  // dimension_pvb: Joi.string(),

});

export const calandraValidate = celebrate({
  [Segments.BODY]: calandraSchema,
});