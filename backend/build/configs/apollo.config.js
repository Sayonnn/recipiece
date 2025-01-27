"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apollo = exports.startApollo = void 0;
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const ErrorProvider_1 = __importDefault(require("../providers/ErrorProvider"));
const types_1 = require("../graphql/types");
const resolvers_1 = require("../graphql/resolvers");
const jwt_middleware_1 = require("../middlewares/jwt.middleware");
const apollo = new server_1.ApolloServer({
    typeDefs: types_1.typeDefs,
    resolvers: resolvers_1.resolvers,
    context: jwt_middleware_1.context,
});
exports.apollo = apollo;
// for nodeJS
const startApollo = async () => {
    try {
        const { url } = await (0, standalone_1.startStandaloneServer)(apollo, {
            listen: { port: 5000 },
        });
        if (url) {
            console.log("Apollo Server running at Port:", url);
            return url;
        }
    }
    catch (error) {
        ErrorProvider_1.default.getError(500);
    }
};
exports.startApollo = startApollo;
