"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ErrorProvider_1 = __importDefault(require("../providers/ErrorProvider"));
const connectMongoDB = async () => {
    try {
        await mongoose_1.default.connect(`${process.env.MONGO_URI}`);
        console.log("Mongoose connected to MongoDB");
    }
    catch (error) {
        console.log(error);
        ErrorProvider_1.default.getError(400);
    }
};
exports.connectMongoDB = connectMongoDB;
