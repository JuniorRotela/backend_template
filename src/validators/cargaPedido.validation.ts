import { celebrate, Joi, Segments } from 'celebrate';

export const cargaPedidoSchema = Joi.object({
  cod_empresa: Joi.number().required(),
  id_usuario: Joi.number().required(),
  n_pedido: Joi.number().required(),
  cantidad: Joi.number(),
  serie: Joi.string().required(),
  id_pedido: Joi.number().required(),
  descripcion: Joi.string(),
  id_vehiculo: Joi.number(),
});

export const cargaPedidoValidate = celebrate({
  [Segments.BODY]: cargaPedidoSchema,
}); 