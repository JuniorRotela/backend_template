import { celebrate, Joi, Segments } from 'celebrate';

export const autoClaveSchema = Joi.object({
  estado:Joi.string().required(),
  primerCaballete: Joi.number().required(),
  segundoCaballete: Joi.number().allow(null).optional(), 
  recetaUtilizada: Joi.number().required(),
  tempAguaCaja1: Joi.number().required(),
  tempAguaCaja2: Joi.number().required(),
  tempAguaCaja3: Joi.number().required(),
  tempInterna: Joi.number().required(),
  tempExterna: Joi.number().required(),
  // nombre:  Joi.string().required(),
});

export const autoClaveValidate = celebrate({
  [Segments.BODY]: autoClaveSchema,
});