"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsConfig = void 0;
const cors_1 = __importDefault(require("cors"));
const DataProvider_1 = require("../providers/DataProvider");
const corsConfig = (0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || DataProvider_1.origins.indexOf(origin) != -1) {
            callback(null, true);
        }
        else {
            callback(new Error("Request origin is unauthorized!"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
});
exports.corsConfig = corsConfig;
