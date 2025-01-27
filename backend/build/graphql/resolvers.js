"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const jwt_1 = require("../utils/jwt");
const authenticationModel_1 = __importDefault(require("../models/authenticationModel"));
const recipeModel_1 = __importDefault(require("../models/recipeModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const resolvers = {
    Query: {
        getRecipes: async (_, { limit = 10, offset = 0 }) => {
            try {
                const recipes = await recipeModel_1.default.find().skip(offset).limit(limit);
                return recipes;
            }
            catch (error) {
                throw new Error("Error fetching recipes: " + error.message);
            }
        },
        getRecipe: async (_, { id }) => {
            try {
                const recipe = await recipeModel_1.default.findById(id);
                if (!recipe) {
                    throw new Error("Recipe not found");
                }
                return recipe;
            }
            catch (error) {
                throw new Error("Error fetching recipe: " + error.message);
            }
        },
        /** user info */
        getUser: async (_, { id }, { userId }) => {
            if (!userId)
                throw new Error("Not authenticated");
            const user = await authenticationModel_1.default.findById(id).lean();
            if (!user)
                throw new Error("User not found");
            return Object.assign(Object.assign({}, user), { id: user._id });
        },
    },
    Mutation: {
        addIngredient: async (_, { id, ingredient }) => {
            try {
                const recipe = await recipeModel_1.default.findById(id);
                if (!recipe) {
                    throw new Error("Recipe not found");
                }
                recipe.ingredients.push(ingredient);
                await recipe.save();
                return recipe;
            }
            catch (error) {
                throw new Error("Error adding ingredient: " + error.message);
            }
        },
        createRecipe: async (_, { name, description, ingredients }, { id }) => {
            try {
                const newRecipe = new recipeModel_1.default({
                    recipeName: name,
                    description: description,
                    ingredients: ingredients,
                });
                const savedRecipe = await newRecipe.save();
                return savedRecipe;
            }
            catch (error) {
                throw new Error("Error creating recipe: " + error.message);
            }
        },
        updateRecipe: async (_, { id, name, description, ingredients }) => {
            try {
                const recipe = await recipeModel_1.default.findById(id);
                if (!recipe) {
                    throw new Error("Recipe not found");
                }
                const newValues = {
                    recipeName: name || recipe.recipeName,
                    description: description || recipe.description,
                    ingredients: ingredients || recipe.ingredients,
                };
                const updatedRecipe = await recipeModel_1.default.findByIdAndUpdate(id, newValues, { new: true, runValidators: true });
                return updatedRecipe;
            }
            catch (error) {
                throw new Error("Error updating recipe: " + error.message);
            }
        },
        deleteRecipe: async (_, { id }) => {
            try {
                const recipe = await recipeModel_1.default.findById(id);
                if (!recipe) {
                    throw new Error("Recipe not found");
                }
                const state = await recipeModel_1.default.findByIdAndDelete(id);
                if (state) {
                    return true;
                }
            }
            catch (error) {
                throw new Error("Error deleting recipe: " + error.message);
            }
        },
        /** user authentications */
        signUp: async (_, { username, email, password }) => {
            try {
                const hashedPassword = await bcryptjs_1.default.hash(password, 10);
                if (!hashedPassword) {
                    throw new Error("Error hashing password");
                }
                const newUser = new authenticationModel_1.default({
                    username,
                    email,
                    password: hashedPassword,
                });
                const savedUser = await newUser.save();
                console.log(savedUser);
                const token = (0, jwt_1.generateToken)(savedUser, "1day");
                return { user: savedUser, token };
            }
            catch (error) {
                throw new Error("Error signing up: " + error.message);
            }
        },
        signIn: async (_, { username, password }) => {
            try {
                const user = await authenticationModel_1.default.findOne({ username });
                if (!user) {
                    throw new Error("User not found");
                }
                const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
                if (!isPasswordValid) {
                    throw new Error("Invalid password");
                }
                const token = (0, jwt_1.generateToken)(user);
                return { user, token };
            }
            catch (error) {
                throw new Error("Error signing in: " + error.message);
            }
        },
        // refresh tokens
        refreshToken: async (_, { token }) => {
            try {
                const decodedToken = verifyToken(token);
                const user = await authenticationModel_1.default.findById(decodedToken.id);
                if (!user) {
                    throw new Error("User not found");
                }
                const newToken = (0, jwt_1.generateToken)(user, "30d");
                return newToken;
            }
            catch (error) {
                throw new Error("Error refreshing token: " + error.message);
            }
        }
    },
};
exports.resolvers = resolvers;
