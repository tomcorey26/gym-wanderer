"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const type_graphql_1 = require("type-graphql");
const Alert_1 = require("../entity/Alert");
const isAuth_1 = require("../isAuth");
let AlertResolver = class AlertResolver {
    toggleAlertOff(alertId, { payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Alert_1.Alert.update({ id: alertId, userId: payload.userId }, { isActive: false });
            }
            catch (err) {
                console.log('err', err);
                return false;
            }
            return true;
        });
    }
    toggleAllAlertsOff({ payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Alert_1.Alert.createQueryBuilder()
                    .update(Alert_1.Alert)
                    .set({ isActive: false })
                    .where(' "userId" = :id', { id: payload.userId })
                    .execute();
            }
            catch (err) {
                return false;
            }
            return true;
        });
    }
    myAlerts({ payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Alert_1.Alert.find({
                    where: { userId: payload === null || payload === void 0 ? void 0 : payload.userId },
                    order: { date_created: 'DESC' },
                });
            }
            catch (err) {
                return false;
            }
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg('alertId', () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AlertResolver.prototype, "toggleAlertOff", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AlertResolver.prototype, "toggleAllAlertsOff", null);
__decorate([
    type_graphql_1.Query(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AlertResolver.prototype, "myAlerts", null);
AlertResolver = __decorate([
    type_graphql_1.Resolver()
], AlertResolver);
exports.AlertResolver = AlertResolver;
//# sourceMappingURL=AlertResolver.js.map