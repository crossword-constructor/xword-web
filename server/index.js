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
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const apollo_server_express_1 = require("apollo-server-express");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import auth from './auth';
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const typeDefs_1 = __importDefault(require("./typeDefs"));
const resolvers_1 = __importDefault(require("./resolvers"));
const knex_1 = __importDefault(require("knex"));
// import schemaDirectives from './directives';
const config_1 = require("./config");
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(config_1.DB_URI, {
            useNewUrlParser: true,
        });
        const knex = (0, knex_1.default)({
            client: 'pg',
            connection: {
                host: config_1.PG_HOST,
                port: 5432,
                user: config_1.PG_USERNAME,
                password: config_1.PG_PW,
                database: config_1.PG_DB_NAME,
            }
        });
        try {
            // await sequelize.authenticate();
            // await Word.sync({ force: true })
            // await WordList.sync({ force: true })
            // console.log("writing to db")
            // writeToDb();
            // console.log('Connection has been established successfully.');
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
        }
        const app = (0, express_1.default)();
        app.disable('x-powered-by');
        const server = new apollo_server_express_1.ApolloServer({
            path: '/graphql',
            typeDefs: typeDefs_1.default,
            resolvers: resolvers_1.default,
            playground: config_1.IN_PROD
                ? false
                : {
                    settings: {
                        'request.credentials': 'include',
                    },
                },
            context: ({ req, res }) => {
                res.set('Access-Control-Allow-Origin', config_1.APP_URL);
                const { user } = req.cookies;
                if (user) {
                    try {
                        req.user = jsonwebtoken_1.default.verify(user, config_1.SECRET);
                    }
                    catch (e) {
                        console.log('ERORR: ', e);
                    }
                }
                return { req, res };
            },
        });
        app.use((0, cors_1.default)({
            origin: config_1.APP_URL,
            credentials: true,
        }));
        app.use((0, cookie_parser_1.default)());
        if (config_1.IN_PROD) {
            app.use(express_1.default.static(path_1.default.join(__dirname, '../client/build')));
            app.get('/*', (req, res) => {
                res.sendFile(path_1.default.join(__dirname, '../client/build/index.html'));
            });
        }
        server.applyMiddleware({ app });
        app.listen({ port: config_1.PORT }, () => console.log(`server ready at ${config_1.PORT}`));
    }
    catch (e) {
        console.error(e);
    }
}))();
