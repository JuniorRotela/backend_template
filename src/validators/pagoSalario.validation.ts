import { celebrate, Joi, Segments } from 'celebrate';



export const pagoSchema = Joi.object({
  id_usuario: Joi.number().required(),
  salario_pagado: Joi.string().required(),
  // descuento: Joi.string().required(),
  // cedula: Joi.string().required(),
  // dias: Joi.number().required(),
  mes: Joi.string().required(),
  salario_real: Joi.string().required(),
  salario_ips: Joi.string().required(),



});

export const PagosValidate = celebrate({
  [Segments.BODY]: pagoSchema,
});