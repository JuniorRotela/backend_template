import { celebrate, Joi, Segments } from 'celebrate';

export const horariosSchema = Joi.object({
  descripcion: Joi.string().required(),
  hora_entrada: Joi.string().required(),
  hora_salida: Joi.string().required(),
});

export const horariosValidate = celebrate({
  [Segments.BODY]: horariosSchema,
});