"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.context = void 0;
const jwt_1 = require("../utils/jwt");
const context = async ({ req }) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token)
        return {};
    console.log(token);
    if (token) {
        try {
            const decodedToken = (0, jwt_1.verifyToken)(token);
            return { id: decodedToken.userId, username: decodedToken.username };
        }
        catch (error) {
            throw new Error("Authentication failed");
        }
    }
};
exports.context = context;
