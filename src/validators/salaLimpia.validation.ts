import { celebrate, Joi, Segments } from 'celebrate';

export const salaLimpiaSchema = Joi.object({
  humedad_int: Joi.string().required(),
  temp_interna: Joi.string().required(),
  cod_empresa: Joi.number().required(),
  id_usuario: Joi.number().required(),

});

export const salaValidate = celebrate({
  [Segments.BODY]: salaLimpiaSchema,
});