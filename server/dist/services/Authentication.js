"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const db_1 = require("../db");
const Authentication_1 = __importDefault(require("../utils/Authentication"));
const UserMethods_1 = require("../database/UserMethods");
class AuthenticationService {
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield new UserMethods_1.UserDbMethods().getByEmail(email);
            if (!user) {
                return "";
            }
            const isMatch = yield Authentication_1.default.comparePassword(password, user.password);
            if (isMatch) {
                const token = Authentication_1.default.generateToken(user.id, user.name, user.email);
                return token;
            }
            return "";
        });
    }
    register(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield db_1.prisma.user.findUnique({
                    where: {
                        email: email
                    }
                });
                if (users) {
                    throw new Error("User already exists with this email");
                }
                const hashedPassword = yield Authentication_1.default.hashPassword(password);
                const user = yield db_1.prisma.user.create({
                    data: {
                        name: name,
                        email: email,
                        password: hashedPassword,
                    },
                });
            }
            catch (error) {
                throw new Error("Problem registering. Please try again.");
            }
        });
    }
}
exports.AuthenticationService = AuthenticationService;
exports.default = new AuthenticationService();
