"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const authenticationSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /@gmail\.com$/.test(value);
            },
            message: (props) => `${props.value} is not a valid email address!`,
        },
    },
    password: { type: String, required: true },
    createdAt: { type: String, default: new Date().toLocaleDateString() },
});
const authenticationModel = (0, mongoose_1.model)("Authentication", authenticationSchema);
exports.default = authenticationModel;
