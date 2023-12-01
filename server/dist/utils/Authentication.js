"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Authentication {
    static hashPassword(password) {
        return bcrypt_1.default.hash(password, 13);
    }
    static comparePassword(originalPassword, hashedPassword) {
        const match = bcrypt_1.default.compare(originalPassword, hashedPassword);
        return match;
    }
    static generateToken(id, name, email) {
        const payload = {
            userId: id,
            name: name,
            email: email
        };
        const secretKey = process.env.JWT_SECRET_KEY || "secretKey";
        const expireTime = { expiresIn: process.env.JWT_EXPIRE_TIME };
        const token = jsonwebtoken_1.default.sign(payload, secretKey, expireTime);
        return token;
    }
    static verifyToken(token) {
        try {
            const secretKey = process.env.JWT_SECRET_KEY || "secretKey";
            return jsonwebtoken_1.default.verify(token, secretKey);
        }
        catch (err) {
            return null;
        }
    }
}
exports.default = Authentication;
