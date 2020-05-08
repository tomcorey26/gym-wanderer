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
const isAuth_1 = require("../isAuth");
const Membership_1 = require("../entity/Membership");
const Gym_1 = require("../entity/Gym");
const Alert_1 = require("../entity/Alert");
const User_1 = require("../entity/User");
let MembershipResolver = class MembershipResolver {
    joinGym({ payload }, gymId, end_date, auto_renewal, payment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const memberId = payload.userId;
                yield Membership_1.Membership.create({
                    end_date,
                    memberId,
                    gymId,
                    payment,
                    isAutoRenewalActive: auto_renewal,
                }).save();
                const joinedGym = yield Gym_1.Gyms.findOne(gymId);
                yield Alert_1.Alert.create({
                    message: `Congrats! You have joined ${joinedGym === null || joinedGym === void 0 ? void 0 : joinedGym.gym_name}`,
                    userId: memberId,
                    link: `/gyms/${joinedGym === null || joinedGym === void 0 ? void 0 : joinedGym.id}`,
                }).save();
                const member = yield User_1.User.findOne(memberId);
                yield Alert_1.Alert.create({
                    message: `Congrats! ${member === null || member === void 0 ? void 0 : member.first_name} ${member === null || member === void 0 ? void 0 : member.last_name} has joined your gym`,
                    userId: joinedGym === null || joinedGym === void 0 ? void 0 : joinedGym.ownerId,
                    link: `/analytics`,
                }).save();
            }
            catch (err) {
                console.log(err);
                return false;
            }
            return true;
        });
    }
    myMemberships({ payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            const memberships = yield Membership_1.Membership.find({
                where: { memberId: payload.userId },
                relations: ['member', 'gym'],
            });
            return memberships;
        });
    }
    userMemberships(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const memberships = yield Membership_1.Membership.find({
                where: { memberId: userId },
                relations: ['member', 'gym'],
            });
            return memberships;
        });
    }
    gymMemberships(gymId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Membership_1.Membership.find({
                where: { gymId },
                relations: ['member', 'gym'],
                order: { begin_date: 'DESC' },
            });
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg('gymId')),
    __param(2, type_graphql_1.Arg('end_date')),
    __param(3, type_graphql_1.Arg('auto_renewal')),
    __param(4, type_graphql_1.Arg('payment')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number, Boolean, Number]),
    __metadata("design:returntype", Promise)
], MembershipResolver.prototype, "joinGym", null);
__decorate([
    type_graphql_1.Query(() => [Membership_1.Membership], { nullable: true }),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MembershipResolver.prototype, "myMemberships", null);
__decorate([
    type_graphql_1.Query(() => [Membership_1.Membership], { nullable: true }),
    __param(0, type_graphql_1.Arg('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MembershipResolver.prototype, "userMemberships", null);
__decorate([
    type_graphql_1.Query(() => [Membership_1.Membership], { nullable: true }),
    __param(0, type_graphql_1.Arg('gymId', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MembershipResolver.prototype, "gymMemberships", null);
MembershipResolver = __decorate([
    type_graphql_1.Resolver()
], MembershipResolver);
exports.MembershipResolver = MembershipResolver;
//# sourceMappingURL=MembershipResolver.js.map