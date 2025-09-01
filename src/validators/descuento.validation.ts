import { celebrate, Joi, Segments } from 'celebrate';
 
export const descuentoSchema = Joi.object({
  descripcion: Joi.string().required(),
  monto: Joi.string().required(),
});

export const descuentoValidate = celebrate({
  [Segments.BODY]: descuentoSchema,
});