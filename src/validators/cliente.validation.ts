import { celebrate, Joi, Segments } from 'celebrate';

export const clienteSchema = Joi.object({
  descripcion: Joi.string().required(),
  pais: Joi.string().required(),
  direccion: Joi.string().required(),
  telefono: Joi.string(),
  id_empresa: Joi.number().required(),
});

export const clienteValidate = celebrate({
  [Segments.BODY]: clienteSchema,
}); 