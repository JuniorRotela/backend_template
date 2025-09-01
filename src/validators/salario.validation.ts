import { celebrate, Joi, Segments } from 'celebrate';

export const salarioSchema = Joi.object({
  descripcion: Joi.string().required(),
  monto: Joi.string().required(),
});

export const salarioValidate = celebrate({
  [Segments.BODY]: salarioSchema,
});