"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const apollo_config_1 = require("./configs/apollo.config");
const mongoose_config_1 = require("./configs/mongoose.config");
const express4_1 = require("@apollo/server/express4");
const cors_config_1 = require("./configs/cors.config");
const ErrorProvider_1 = __importDefault(require("./providers/ErrorProvider"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors_config_1.corsConfig);
const port = process.env.PORT || 3000;
(0, mongoose_config_1.connectMongoDB)();
app.get("/", (_, res) => {
    res.send("Hello World");
});
const startApollo = async () => {
    await apollo_config_1.apollo.start();
    app.use("/graphql", (0, express4_1.expressMiddleware)(apollo_config_1.apollo));
};
startApollo()
    .then(() => {
    app.listen(port, () => {
        console.log(`Express + Apollo Server running on http://localhost:${port}`);
    });
})
    .catch((error) => {
    ErrorProvider_1.default.getError(error);
});
