"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidate = exports.loginSchema = void 0;
const celebrate_1 = require("celebrate");
exports.loginSchema = celebrate_1.Joi.object({
    username: celebrate_1.Joi.string().required(),
    password: celebrate_1.Joi.string().required(),
});
exports.loginValidate = (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: exports.loginSchema,
});
