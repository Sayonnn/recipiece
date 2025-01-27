"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret_key = process.env.JWT_SECRET;
const generateToken = (payload, expires) => {
    if (!secret_key) {
        throw new Error("JWT_SECRET is not defined");
    }
    if (!expires) {
        throw new Error("JWT_EXPIRES is not defined");
    }
    return jsonwebtoken_1.default.sign(payload, secret_key, { expiresIn: expires });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        if (!secret_key) {
            throw new Error("JWT_SECRET is not defined");
        }
        return jsonwebtoken_1.default.verify(token, secret_key);
    }
    catch (error) {
        throw new Error("Invalid token");
    }
};
exports.verifyToken = verifyToken;
