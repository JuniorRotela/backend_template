import { celebrate, Joi, Segments } from 'celebrate';

export const sancionSchema = Joi.object({
  id_empleado: Joi.number().required(),
  id_descuento:Joi.number().required()
});

export const sancioValidate = celebrate({
  [Segments.BODY]: sancionSchema,
});