"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define Ingredient schema
const ingredientSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    quantity: { type: String, required: true },
});
// Define Recipe schema
const recipeSchema = new mongoose_1.Schema({
    recipeName: { type: String, required: true },
    description: { type: String },
    createdAt: { type: String, default: new Date().toLocaleDateString() },
    thumbsUp: { type: Number, default: 0 },
    thumbsDown: { type: Number, default: 0 },
    ingredients: [ingredientSchema],
});
// Create and export the model for Recipe
const recipeModel = (0, mongoose_1.model)("Recipe", recipeSchema);
exports.default = recipeModel;
