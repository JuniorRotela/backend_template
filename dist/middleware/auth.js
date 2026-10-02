"use strict";
// src/middleware/auth.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.SECRET_KEY || 'default_secret_key';
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, secretKey, {
        expiresIn: '8h',
    });
};
exports.generateToken = generateToken;
