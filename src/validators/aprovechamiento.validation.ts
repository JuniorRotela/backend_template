import { celebrate, Joi, Segments } from 'celebrate';

export const aprovechamientoSchema = Joi.object({
  serie: Joi.string().required(),
  imagen: Joi.string().required(),

});

export const aprovechamientoValidate = celebrate({
  [Segments.BODY]: aprovechamientoSchema,
});