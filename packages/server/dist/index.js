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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const refreshToken_1 = require("./refreshToken");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const UserResolver_1 = require("./resolvers/UserResolver");
const GymResolver_1 = require("./resolvers/GymResolver");
const MembershipResolver_1 = require("./resolvers/MembershipResolver");
const ReviewResolver_1 = require("./resolvers/ReviewResolver");
const AlertResolver_1 = require("./resolvers/AlertResolver");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    app.use(cors_1.default({
        origin: 'http://localhost:3000',
        credentials: true,
    }));
    app.use(cookie_parser_1.default());
    app.get('/', (_req, res) => res.send('yo'));
    app.post('/refresh_token', refreshToken_1.refreshToken);
    yield typeorm_1.createConnection();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [
                UserResolver_1.UserResolver,
                GymResolver_1.GymResolver,
                MembershipResolver_1.MembershipResolver,
                ReviewResolver_1.ReviewResolver,
                AlertResolver_1.AlertResolver,
            ],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res }),
    });
    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(4000, () => {
        console.log('express server started');
    });
}))();
//# sourceMappingURL=index.js.map