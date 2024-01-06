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
exports.UserDbMethods = void 0;
const db_1 = require("../db");
class UserDbMethods {
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield db_1.prisma.user.create({
                    data: {
                        name: user.name,
                        email: user.email,
                        password: user.password,
                    },
                });
            }
            catch (error) {
                throw new Error("Failed to create user! Please try again");
            }
        });
    }
    update(userId, userInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.prisma.user.findUnique({
                where: {
                    id: userId
                }
            });
            if (!user) {
                throw new Error("User ");
            }
            const updatedUser = yield db_1.prisma.user.update({
                where: {
                    id: userId
                },
                data: userInfo
            });
            if (!updatedUser) {
                throw new Error("Failed to update user");
            }
            return updatedUser;
        });
    }
    delete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield db_1.prisma.user.delete({
                    where: {
                        id: userId,
                    },
                });
            }
            catch (error) {
                throw new Error("Failed to delete user! Please try again");
            }
        });
    }
    getById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (!user) {
                // Handle the case where the user is not found, e.g., throw an error
                throw new Error(`User with ID ${userId} not found`);
            }
            return user;
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.prisma.user.findUnique({
                where: {
                    email: email,
                },
            });
            if (!user) {
                // Handle the case where the user is not found, e.g., throw an error
                throw new Error(`User with email ${email} not found`);
            }
            return user;
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield db_1.prisma.user.findMany();
            if (!users) {
                throw new Error("Could not retrieve all Users");
            }
            return users;
        });
    }
}
exports.UserDbMethods = UserDbMethods;
