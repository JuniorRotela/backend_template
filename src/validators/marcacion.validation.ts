import { celebrate, Joi, Segments } from 'celebrate';

export const marcacionSchema = Joi.object({
  entrada: Joi.number().required(),
  salida: Joi.number().required(),
  id_empleado:Joi.number()
});

export const marcacionValidate = celebrate({
  [Segments.BODY]: marcacionSchema,
});