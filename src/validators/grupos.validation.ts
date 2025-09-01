import { celebrate, Joi, Segments } from 'celebrate';

export const gruposSchema = Joi.object({
  descripcion: Joi.string().required(),
  // monto: Joi.string(),
  id_horario:Joi.number()
});

export const gruposValidate = celebrate({
  [Segments.BODY]: gruposSchema,
});