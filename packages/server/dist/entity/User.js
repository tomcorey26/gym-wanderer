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
const type_graphql_1 = require("type-graphql");
const Preferences_1 = require("./Preferences");
const Gym_1 = require("./Gym");
const Reviews_1 = require("./Reviews");
const Membership_1 = require("./Membership");
const Alert_1 = require("./Alert");
let User = class User extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], User.prototype, "first_name", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], User.prototype, "last_name", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column('text', { unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ length: '30', unique: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "birthday", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], User.prototype, "photo_url", void 0);
__decorate([
    typeorm_1.Column('int', { default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "tokenVersion", void 0);
__decorate([
    type_graphql_1.Field(() => Preferences_1.Preferences),
    typeorm_1.OneToOne(() => Preferences_1.Preferences),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Preferences_1.Preferences)
], User.prototype, "preferences", void 0);
__decorate([
    type_graphql_1.Field(() => Gym_1.Gyms, { nullable: true }),
    typeorm_1.OneToOne(() => Gym_1.Gyms),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Gym_1.Gyms)
], User.prototype, "gym", void 0);
__decorate([
    type_graphql_1.Field(() => [Reviews_1.Reviews], { nullable: true }),
    typeorm_1.OneToMany(() => Reviews_1.Reviews, (review) => review.creator),
    __metadata("design:type", Array)
], User.prototype, "reviews", void 0);
__decorate([
    type_graphql_1.Field(() => [Membership_1.Membership], { nullable: true }),
    typeorm_1.OneToMany(() => Membership_1.Membership, (membership) => membership.member),
    __metadata("design:type", Array)
], User.prototype, "memberships", void 0);
__decorate([
    type_graphql_1.Field(() => [Alert_1.Alert], { nullable: true }),
    typeorm_1.OneToMany(() => Alert_1.Alert, (alert) => alert.user),
    __metadata("design:type", Array)
], User.prototype, "alerts", void 0);
User = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity('users')
], User);
exports.User = User;
//# sourceMappingURL=User.js.map