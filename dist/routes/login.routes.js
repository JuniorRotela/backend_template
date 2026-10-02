"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/login.routes.ts
const express_1 = require("express");
const login_validation_1 = require("../validators/login.validation");
const login_controllers_1 = require("../controllers/login.controllers");
const router = (0, express_1.Router)();
router.post('/login', login_validation_1.loginValidate, login_controllers_1.loginController);
exports.default = router;
