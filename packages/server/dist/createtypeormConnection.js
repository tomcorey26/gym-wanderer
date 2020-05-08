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
const Alert_1 = require("./entity/Alert");
const Gym_1 = require("./entity/Gym");
const Membership_1 = require("./entity/Membership");
const Preferences_1 = require("./entity/Preferences");
const User_1 = require("./entity/User");
const Reviews_1 = require("./entity/Reviews");
const typeorm_1 = require("typeorm");
exports.createtypeormConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    let retries = 10;
    while (retries) {
        try {
            yield typeorm_1.createConnection(process.env.NODE_ENV === 'production'
                ? {
                    type: 'postgres',
                    host: 'host.docker.internal',
                    port: 5432,
                    username: 'tom',
                    password: 'test',
                    database: 'wanderer-db',
                    synchronize: true,
                    entities: [Alert_1.Alert, Gym_1.Gyms, Membership_1.Membership, Preferences_1.Preferences, User_1.User, Reviews_1.Reviews],
                    logger: 'debug',
                }
                : {
                    type: 'postgres',
                    host: 'localhost',
                    port: 5432,
                    username: 'tom',
                    password: 'test',
                    database: 'wanderer-db',
                    synchronize: true,
                    entities: [Alert_1.Alert, Gym_1.Gyms, Membership_1.Membership, Preferences_1.Preferences, User_1.User, Reviews_1.Reviews],
                });
            break;
        }
        catch (err) {
            console.log(err);
            retries -= 1;
            console.log(`retries left: ${retries}`);
            yield new Promise((res) => setTimeout(res, 5000));
        }
    }
    console.log('it works');
});
//# sourceMappingURL=createtypeormConnection.js.map