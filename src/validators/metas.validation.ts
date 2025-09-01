import { celebrate, Joi, Segments } from 'celebrate';

export const metasSchema = Joi.object({
  id_grupo: Joi.number().required(),
  id_plus: Joi.number().required(),
  // descripcion: Joi.string().required(),
  // cantidad: Joi.string()
  motivo: Joi.string().required(),

});

export const metasValidate = celebrate({
  [Segments.BODY]: metasSchema,
});