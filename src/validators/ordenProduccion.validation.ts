import { celebrate, Joi, Segments } from 'celebrate';

export const ordenProduccionSchema = Joi.object({
  id_producto: Joi.number(),
  estado: Joi.number().required(),
  cantidad: Joi.number(),
  estado_calandra: Joi.number(),
  orden: Joi.number()
});

export const ordenProduccionValidate = celebrate({
  [Segments.BODY]: ordenProduccionSchema,
}); 