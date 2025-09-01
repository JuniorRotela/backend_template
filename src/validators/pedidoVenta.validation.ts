import { celebrate, Joi, Segments } from 'celebrate';

export const pedidoVentaSchema = Joi.object({
  cod_empresa: Joi.number().required(),
  id_usuario: Joi.number().required(),
  id_vehiculo: Joi.number().required(),
  formaDePago: Joi.string(),
  // n_pedido: Joi.number(),
  id_cliente: Joi.number().required(),
  // id_producto: Joi.number().required(),
  // cantida: Joi.number().required(),
  // precio: Joi.number(),
  data: Joi.array(),
});

export const pedidoVentaValidate = celebrate({
  [Segments.BODY]: pedidoVentaSchema,
}); 