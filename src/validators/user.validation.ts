import { celebrate, Joi, Segments } from 'celebrate';

export const userSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  password: Joi.string().required(),
  id_level: Joi.number().required(),
  username: Joi.string().required(),
  cargo: Joi.string().required(),
  id_empleado:Joi.number().required(),
  id_grupo:Joi.number().required(),
  id_horarios:Joi.number().required(),
  id_salario:Joi.number().required(),
  cod_empresa:Joi.number().required(),
});

export const userValidate = celebrate({
  [Segments.BODY]: userSchema,
});