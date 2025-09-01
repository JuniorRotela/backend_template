import { celebrate, Joi, Segments } from 'celebrate';

export const proveedorSchema = Joi.object({
  nombre: Joi.string().required(),
  direccion:Joi.string(),
  contacto:Joi.string(),
});

export const proveedorValidate = celebrate({
  [Segments.BODY]: proveedorSchema,
});