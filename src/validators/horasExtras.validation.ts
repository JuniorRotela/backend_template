import { celebrate, Joi, Segments } from 'celebrate';

export const horasExtrasSchema = Joi.object({
  id_empleado: Joi.number().required(),
  entrada:  Joi.number().required(),
  salida:  Joi.number().required(),
  // nombre:  Joi.string().required(),
});

export const horasExtrasValidate = celebrate({
  [Segments.BODY]: horasExtrasSchema,
});