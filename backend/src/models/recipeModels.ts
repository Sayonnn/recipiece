import { model, Schema } from "mongoose";

// Define Ingredient schema
const ingredientSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
});

// Define Recipe schema
const recipeSchema = new Schema({
  recipeName: { type: String, required: true },
  description: { type: String },
  createdAt: { type: String, default: new Date().toLocaleDateString() },
  thumbsUp: { type: Number, default: 0 },
  thumbsDown: { type: Number, default: 0 },
  ingredients: [ingredientSchema],
});

// Create and export the model for Recipe
const recipeModel = model("Recipe", recipeSchema);

export default recipeModel;
