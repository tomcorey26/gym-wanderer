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
const User_1 = require("../entity/User");
const bcryptjs_1 = require("bcryptjs");
const auth_1 = require("../auth");
const isAuth_1 = require("../isAuth");
const sendRefreshToken_1 = require("../sendRefreshToken");
const jsonwebtoken_1 = require("jsonwebtoken");
const Preferences_1 = require("../entity/Preferences");
const Membership_1 = require("../entity/Membership");
const Alert_1 = require("../entity/Alert");
const Gym_1 = require("../entity/Gym");
let LoginResponse = class LoginResponse {
};
__decorate([
    type_graphql_1.Field(() => User_1.User),
    __metadata("design:type", User_1.User)
], LoginResponse.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], LoginResponse.prototype, "accessToken", void 0);
LoginResponse = __decorate([
    type_graphql_1.ObjectType()
], LoginResponse);
let PreferencesInput = class PreferencesInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], PreferencesInput.prototype, "yoga", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], PreferencesInput.prototype, "crossfit", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], PreferencesInput.prototype, "bodybuilding", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], PreferencesInput.prototype, "parkour", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], PreferencesInput.prototype, "general", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], PreferencesInput.prototype, "boxing", void 0);
PreferencesInput = __decorate([
    type_graphql_1.InputType()
], PreferencesInput);
let UserUpdateInput = class UserUpdateInput {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UserUpdateInput.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UserUpdateInput.prototype, "first_name", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UserUpdateInput.prototype, "last_name", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UserUpdateInput.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UserUpdateInput.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UserUpdateInput.prototype, "birthday", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UserUpdateInput.prototype, "photo_url", void 0);
__decorate([
    type_graphql_1.Field(() => PreferencesInput, { nullable: true }),
    __metadata("design:type", PreferencesInput)
], UserUpdateInput.prototype, "preferences", void 0);
UserUpdateInput = __decorate([
    type_graphql_1.ArgsType()
], UserUpdateInput);
const userRelations = ['gym', 'preferences', 'memberships', 'alerts'];
let UserResolver = class UserResolver {
    hello() {
        return 'hello world';
    }
    bye({ payload }) {
        return `your user id is: ${payload.userId}`;
    }
    users() {
        return User_1.User.find({ relations: userRelations });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id)
                return null;
            let user = yield User_1.User.findOne({
                where: {
                    id,
                },
                relations: ['gym', 'preferences'],
            });
            return user;
        });
    }
    deleteUser({ payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Membership_1.Membership.delete({
                memberId: payload.userId,
            });
            yield Alert_1.Alert.delete({
                userId: payload.userId,
            });
            yield User_1.User.delete({
                id: payload.userId,
            });
            yield Gym_1.Gyms.delete({
                ownerId: payload.userId,
            });
            return true;
        });
    }
    updateUser({ payload }, userArgs) {
        return __awaiter(this, void 0, void 0, function* () {
            const prefs = yield Preferences_1.Preferences.create(Object.assign({}, userArgs.preferences)).save();
            try {
                yield User_1.User.update({
                    id: payload.userId,
                }, Object.assign(Object.assign({}, userArgs), { preferences: prefs }));
            }
            catch (err) {
                console.log('err', err);
                return false;
            }
            return true;
        });
    }
    me(context) {
        const authorization = context.req.headers['authorization'];
        if (!authorization) {
            return null;
        }
        try {
            const token = authorization.split(' ')[1];
            const payload = jsonwebtoken_1.verify(token, process.env.ACCESS_TOKEN_SECRET);
            return User_1.User.findOne(payload.userId, {
                relations: userRelations,
            });
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }
    register(username, email, password, first_name, last_name, preferences, birthday, photo_url) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcryptjs_1.hash(password, 12);
            try {
                const prefs = Preferences_1.Preferences.create(Object.assign({}, preferences));
                yield prefs.save();
                const user = User_1.User.create({
                    username,
                    email,
                    password: hashedPassword,
                    birthday,
                    first_name,
                    last_name,
                    photo_url: photo_url
                        ? photo_url
                        : `https://robohash.org/${Math.random().toString(36).substring(2, 15) +
                            Math.random().toString(36).substring(2, 15)}?set=set2`,
                    preferences: prefs,
                });
                yield user.save();
            }
            catch (err) {
                console.log(err);
                return false;
            }
            return true;
        });
    }
    login(username, password, { res }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({
                where: { username },
                relations: userRelations,
            });
            if (!user) {
                throw new Error('Could not find User');
            }
            const valid = yield bcryptjs_1.compare(password, user.password);
            if (!valid) {
                throw new Error('bad password');
            }
            sendRefreshToken_1.sendRefreshToken(res, auth_1.createRefreshToken(user));
            return {
                accessToken: auth_1.createAccessToken(user),
                user,
            };
        });
    }
    logout({ res }) {
        return __awaiter(this, void 0, void 0, function* () {
            sendRefreshToken_1.sendRefreshToken(res, '');
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "hello", null);
__decorate([
    type_graphql_1.Query(() => String),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "bye", null);
__decorate([
    type_graphql_1.Query(() => [User_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "users", null);
__decorate([
    type_graphql_1.Query(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Arg('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUser", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UserUpdateInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
__decorate([
    type_graphql_1.Query(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "me", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('username')),
    __param(1, type_graphql_1.Arg('email')),
    __param(2, type_graphql_1.Arg('password')),
    __param(3, type_graphql_1.Arg('first_name')),
    __param(4, type_graphql_1.Arg('last_name')),
    __param(5, type_graphql_1.Arg('preferences')),
    __param(6, type_graphql_1.Arg('birthday', () => String, { nullable: true })),
    __param(7, type_graphql_1.Arg('photo_url', () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, PreferencesInput, String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    type_graphql_1.Mutation(() => LoginResponse),
    __param(0, type_graphql_1.Arg('username')),
    __param(1, type_graphql_1.Arg('password')),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "logout", null);
UserResolver = __decorate([
    type_graphql_1.Resolver()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=UserResolver.js.map