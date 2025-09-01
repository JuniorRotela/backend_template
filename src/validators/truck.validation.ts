import { celebrate, Joi, Segments } from 'celebrate';

export const truckSchema = Joi.object({
  brand: Joi.string().required(),
  model: Joi.string(),
  chapa: Joi.string().required(),
  id_empresa: Joi.number().required(),
});

export const truckValidate = celebrate({
  [Segments.BODY]: truckSchema,
});