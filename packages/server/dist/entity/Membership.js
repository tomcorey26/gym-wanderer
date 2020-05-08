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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Gym_1 = require("./Gym");
const type_graphql_1 = require("type-graphql");
let Membership = class Membership extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Membership.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column('boolean'),
    __metadata("design:type", Boolean)
], Membership.prototype, "isAutoRenewalActive", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column('int'),
    __metadata("design:type", Number)
], Membership.prototype, "end_date", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column('int'),
    __metadata("design:type", Number)
], Membership.prototype, "payment", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", String)
], Membership.prototype, "begin_date", void 0);
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], Membership.prototype, "memberId", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User),
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.memberships),
    __metadata("design:type", User_1.User)
], Membership.prototype, "member", void 0);
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], Membership.prototype, "gymId", void 0);
__decorate([
    type_graphql_1.Field(() => Gym_1.Gyms),
    typeorm_1.ManyToOne(() => Gym_1.Gyms, (gym) => gym.memberships),
    __metadata("design:type", Gym_1.Gyms)
], Membership.prototype, "gym", void 0);
Membership = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Membership);
exports.Membership = Membership;
//# sourceMappingURL=Membership.js.map