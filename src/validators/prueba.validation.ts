import { celebrate, Joi, Segments } from 'celebrate';

export const pruebaSchema = Joi.object({
  id_usuario: Joi.number(),
  dias_prueba: Joi.number(),
  final_prueba:Joi.string(),
  status_active:Joi.number()
});

export const pruebaValidate = celebrate({
  [Segments.BODY]: pruebaSchema,
});