"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataProvider_1 = require("./DataProvider");
class ErrorProvider {
    constructor() { }
    getError(status) {
        console.log(this.classifyError(status));
        return this.classifyError(status);
    }
    classifyError(status) {
        var _a;
        const index = DataProvider_1.errors.findIndex((prev) => prev.status === status);
        const message = (_a = DataProvider_1.errors[index]) === null || _a === void 0 ? void 0 : _a.message;
        return message ? message : "Unknown error occured";
    }
}
const Error = new ErrorProvider();
exports.default = Error;
