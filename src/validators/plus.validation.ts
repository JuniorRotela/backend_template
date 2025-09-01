import { celebrate, Joi, Segments } from 'celebrate';

export const plusSchema = Joi.object({
  id_grupo: Joi.number().required(),
  descripcion: Joi.string().required(),
  meta: Joi.string().valid('true', 'false').required(),
  motivo: Joi.string()
});

export const plusValidate = celebrate({
  [Segments.BODY]: plusSchema,
});