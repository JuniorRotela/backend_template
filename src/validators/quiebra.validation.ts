import { celebrate, Joi, Segments } from 'celebrate';

export const quiebraSchema = Joi.object({
  cod_paquete: Joi.string().required(),
  cantidad_retallo: Joi.number().required(),
  sector: Joi.string().required(),
  motivo: Joi.string().required(),
  id_proveedor: Joi.number().required(),
  data: Joi.array(),
  cod_empresa: Joi.number().required(),
  id_usuario: Joi.number().required(),
  imagen: Joi.string().required(),
  // id_caballete: Joi.number().required(),


});

export const quiebraValidate = celebrate({
  [Segments.BODY]: quiebraSchema,
});