"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    const token = req.header("jwt_token");
    // Check if not token
    if (!token) {
        return res.status(403).json({ msg: "authorization denied" });
    }
    try {
        let secretKey = process.env.JWT_SECRET_KEY || "secret";
        const userCreds = jsonwebtoken_1.default.verify(token, secretKey);
        if (userCreds) {
            req.app.locals.credentials = userCreds;
            return next();
        }
        return res.send("token invalid");
    }
    catch (err) {
        return res.send(err);
    }
};
exports.auth = auth;
