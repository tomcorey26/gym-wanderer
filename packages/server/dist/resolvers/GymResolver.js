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
const Gym_1 = require("../entity/Gym");
const Types_1 = require("../Types");
const User_1 = require("../entity/User");
let CreateGymArgs = class CreateGymArgs {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreateGymArgs.prototype, "gym_name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreateGymArgs.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(() => Types_1.GymTypes),
    __metadata("design:type", String)
], CreateGymArgs.prototype, "type", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreateGymArgs.prototype, "membership_cost", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreateGymArgs.prototype, "ownerId", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreateGymArgs.prototype, "location", void 0);
__decorate([
    type_graphql_1.Field(() => Types_1.Coordinates),
    __metadata("design:type", Types_1.Coordinates)
], CreateGymArgs.prototype, "coordinates", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], CreateGymArgs.prototype, "equipment", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], CreateGymArgs.prototype, "photo_urls", void 0);
CreateGymArgs = __decorate([
    type_graphql_1.ArgsType()
], CreateGymArgs);
let GymResolver = class GymResolver {
    createGym({ payload }, GymArgs) {
        return __awaiter(this, void 0, void 0, function* () {
            const gym = yield Gym_1.Gyms.findOne({
                where: { ownerId: payload.userId },
            });
            if (!!gym) {
                console.log('gym already made');
                return false;
            }
            try {
                const createdGym = yield Gym_1.Gyms.create(Object.assign({}, GymArgs));
                yield createdGym.save();
                yield User_1.User.update({ id: payload.userId }, { gym: createdGym });
            }
            catch (err) {
                console.log(err);
                return false;
            }
            return true;
        });
    }
    myGym({ payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const gym = yield Gym_1.Gyms.findOne({ ownerId: payload.userId }, { relations: ['memberships', 'memberships.member'] });
                return gym;
            }
            catch (err) {
                console.log(err);
                return null;
            }
        });
    }
    gymDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id)
                return;
            return yield User_1.User.findOne({
                where: {
                    gym: id,
                },
                relations: ['gym'],
            });
        });
    }
    gyms() {
        return Gym_1.Gyms.find();
    }
};
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateGymArgs]),
    __metadata("design:returntype", Promise)
], GymResolver.prototype, "createGym", null);
__decorate([
    type_graphql_1.Query(() => Gym_1.Gyms, { nullable: true }),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GymResolver.prototype, "myGym", null);
__decorate([
    type_graphql_1.Query(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Arg('id', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GymResolver.prototype, "gymDetails", null);
__decorate([
    type_graphql_1.Query(() => [Gym_1.Gyms]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GymResolver.prototype, "gyms", null);
GymResolver = __decorate([
    type_graphql_1.Resolver()
], GymResolver);
exports.GymResolver = GymResolver;
//# sourceMappingURL=GymResolver.js.map