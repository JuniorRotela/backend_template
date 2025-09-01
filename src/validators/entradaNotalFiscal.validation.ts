import { celebrate, Joi, Segments } from 'celebrate';

export const entradaNotalFiscalSchema = Joi.object({
  cod_empresa: Joi.number().required(),
  id_proveedor: Joi.number().required(),
  numeroNota: Joi.string().required(),
  modelo: Joi.string().required(),
  operacion: Joi.string().required(),
  formaDePago: Joi.string(),
  condicionPago: Joi.string(),
  id_vehiculo: Joi.number().required(),
  id_producto: Joi.string().required(),
  cantidad_total: Joi.number().required(),
  id_usuario: Joi.number(),
  data: Joi.array(),
  tipo: Joi.number().required(),
});

export const entradaNotalFiscalValidate = celebrate({
  [Segments.BODY]: entradaNotalFiscalSchema,
});