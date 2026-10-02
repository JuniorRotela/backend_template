"use strict";
// controllers/login.controllers.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const login_services_1 = require("../services/login/login.services");
const auth_1 = require("../middleware/auth");
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    try {
        const result = yield (0, login_services_1.verifyUser)('users', { username, password });
        console.log('Result from verifyUser:', result); // Agrega este log
        if (result.isValid) {
            // Verifica que result tenga id y username
            const { id, username, id_level, id_sucursal } = result;
            if (id && username) {
                // Generar el token JWT
                const token = (0, auth_1.generateToken)({ id, username });
                return res.status(200).json({
                    message: 'Login successful',
                    token, // Incluir el token en la respuesta
                    id_level,
                    username,
                    id,
                    id_sucursal,
                });
            }
        }
        return res.status(401).json({ message: 'Usuario o Contraseña Incorrecta' });
    }
    catch (error) {
        console.error("Error in loginController:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.loginController = loginController;
