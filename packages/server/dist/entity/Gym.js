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
const Reviews_1 = require("./Reviews");
const Types_1 = require("../Types");
const Membership_1 = require("./Membership");
let Gyms = class Gyms extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Gyms.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Gyms.prototype, "gym_name", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Gyms.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ type: 'money' }),
    __metadata("design:type", String)
], Gyms.prototype, "membership_cost", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], Gyms.prototype, "ownerId", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Gyms.prototype, "location", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    typeorm_1.Column('simple-array'),
    __metadata("design:type", Array)
], Gyms.prototype, "equipment", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    typeorm_1.Column('simple-array'),
    __metadata("design:type", Array)
], Gyms.prototype, "photo_urls", void 0);
__decorate([
    type_graphql_1.Field(() => Types_1.Coordinates),
    typeorm_1.Column('json'),
    __metadata("design:type", Types_1.Coordinates)
], Gyms.prototype, "coordinates", void 0);
__decorate([
    type_graphql_1.Field(() => Types_1.GymTypes),
    typeorm_1.Column('enum', { name: 'type', enum: Types_1.GymTypes }),
    __metadata("design:type", String)
], Gyms.prototype, "type", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column('boolean', { default: false }),
    __metadata("design:type", Boolean)
], Gyms.prototype, "isOpen", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", String)
], Gyms.prototype, "date_created", void 0);
__decorate([
    type_graphql_1.Field(() => [Reviews_1.Reviews], { nullable: true }),
    typeorm_1.OneToMany(() => Reviews_1.Reviews, (review) => review.gym),
    __metadata("design:type", Array)
], Gyms.prototype, "reviews", void 0);
__decorate([
    type_graphql_1.Field(() => [Membership_1.Membership], { nullable: true }),
    typeorm_1.OneToMany(() => Membership_1.Membership, (membership) => membership.gym),
    __metadata("design:type", Array)
], Gyms.prototype, "memberships", void 0);
Gyms = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity('gyms')
], Gyms);
exports.Gyms = Gyms;
//# sourceMappingURL=Gym.js.map