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
const typeorm_1 = require("typeorm");
const User_1 = require("src/entity/User");
exports.revokeRefreshTokensForUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield typeorm_1.getConnection()
        .getRepository(User_1.User)
        .increment({ id: userId }, 'tokenVersion', 1);
    return true;
});
exports.grantRefreshTokensForUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield typeorm_1.getConnection()
        .getRepository(User_1.User)
        .update({ id: userId }, { tokenVersion: 0 });
    return true;
});
//# sourceMappingURL=refreshTokenSecurity.js.map