import { celebrate, Joi, Segments } from 'celebrate';

export const productosSchema = Joi.object({
  codigo: Joi.string().required(),
  cod: Joi.string().required(),
  descripcion: Joi.string().required(),
  id_categoria: Joi.number().required(),
  medidas: Joi.string().required(),
  id_proveedor: Joi.number().required(),

});

export const productosValidate = celebrate({
  [Segments.BODY]: productosSchema,
});