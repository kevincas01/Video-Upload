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
Object.defineProperty(exports, "__esModule", { value: true });
const Authentication_1 = require("../services/Authentication");
class AuthenticationController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const token = yield new Authentication_1.AuthenticationService().login(email, password);
                if (token === "") {
                    return res.status(403).json({
                        status: "Bad Requestt!",
                        message: "Incorrect Email or Password",
                    });
                }
                const loginToken = { type: "Bearer", token: token };
                return res.status(200).json({
                    status: "Ok!",
                    message: "Successfully logged in!",
                    result: loginToken,
                });
            }
            catch (error) {
                return res.status(500).json({
                    status: "Internal server Error!",
                    message: "Internal server Error!",
                });
            }
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                yield new Authentication_1.AuthenticationService().register(name, email, password);
                return res.status(200).json({
                    status: "Ok!",
                    message: "Successfully registered!"
                });
            }
            catch (error) {
                return res.status(500).json({
                    status: "Internal server Error!",
                    message: "Internal server Error!",
                });
            }
        });
    }
}
exports.default = new AuthenticationController();
