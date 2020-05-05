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
const type_graphql_1 = require("type-graphql");
var GymTypes;
(function (GymTypes) {
    GymTypes["yoga"] = "yoga";
    GymTypes["crossfit"] = "crossfit";
    GymTypes["bodybuilding"] = "bodybuilding";
    GymTypes["parkour"] = "parkour";
    GymTypes["general"] = "general";
    GymTypes["boxing"] = "boxing";
})(GymTypes = exports.GymTypes || (exports.GymTypes = {}));
type_graphql_1.registerEnumType(GymTypes, {
    name: 'GymTypes',
    description: 'The types of gyms available on gym wanderer',
});
let Coordinates = class Coordinates {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Float),
    __metadata("design:type", Number)
], Coordinates.prototype, "lat", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Float),
    __metadata("design:type", Number)
], Coordinates.prototype, "lng", void 0);
Coordinates = __decorate([
    type_graphql_1.ObjectType('Coordinates'),
    type_graphql_1.InputType('CoordinatesInput')
], Coordinates);
exports.Coordinates = Coordinates;
//# sourceMappingURL=Types.js.map