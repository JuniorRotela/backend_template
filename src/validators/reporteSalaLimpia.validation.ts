import { celebrate, Joi, Segments } from 'celebrate';

export const problemaSalaLimpiaSchema = Joi.object({
  id_problemasalalimpia: Joi.string().required(),
  entroproblema: Joi.string().required(),
  obs: Joi.string(),
  imagenes: Joi.string(),
  estado_problema: Joi.string(),
  id_usuario: Joi.number(),
  id_registro: Joi.number(),
  turno: Joi.string(),
});

export const reporteSalaLimpiaValidate = celebrate({
  [Segments.BODY]: problemaSalaLimpiaSchema,
});