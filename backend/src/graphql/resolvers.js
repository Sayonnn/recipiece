import { generateToken } from "../utils/jwt";
import authenticationModel from "../models/authenticationModel";
import recipeModel from "../models/recipeModel";
import bcrypt from "bcryptjs";
 
const resolvers = {
  Query: {
    getRecipes: async (_, { limit = 10, offset = 0 }) => {
      try {
        const recipes = await recipeModel.find().skip(offset).limit(limit);
        return recipes;
      } catch (error) {
        throw new Error("Error fetching recipes: " + error.message);
      }
    },
    getRecipe: async (_, { id }) => {
      try {
        const recipe = await recipeModel.findById(id);
        if (!recipe) {
          throw new Error("Recipe not found");
        }
        return recipe;
      } catch (error) {
        throw new Error("Error fetching recipe: " + error.message);
      }
    },
    /** user info */
    getUser: async (_, { id }, { userId }) => {
      if (!userId) throw new Error("Not authenticated");
      const user = await authenticationModel.findById(id).lean();
      if (!user) throw new Error("User not found");
      return { ...user, id: user._id };
    },
    
  },
  Mutation: {
    addIngredient: async (_, { id, ingredient }) => {
      try {
        const recipe = await recipeModel.findById(id);
        if (!recipe) {
          throw new Error("Recipe not found");
        }

        recipe.ingredients.push(ingredient);
        await recipe.save();
        return recipe;
      } catch (error) {
        throw new Error("Error adding ingredient: " + error.message);
      }
    },
    createRecipe: async (_, { name, description, ingredients }, { id }) => {
      try {
        const newRecipe = new recipeModel({
          recipeName: name,
          description: description,
          ingredients: ingredients,
        });

        const savedRecipe = await newRecipe.save();
        return savedRecipe;
      } catch (error) {
        throw new Error("Error creating recipe: " + error.message);
      }
    },
    updateRecipe: async (_, { id, name, description, ingredients }) => {
      try {
        const recipe = await recipeModel.findById(id);
        if (!recipe) {
          throw new Error("Recipe not found");
        }

        const newValues = {
          recipeName: name || recipe.recipeName,
          description: description || recipe.description,
          ingredients: ingredients || recipe.ingredients,
        };

        const updatedRecipe = await recipeModel.findByIdAndUpdate(
          id,
          newValues,
          { new: true, runValidators: true }
        );
        return updatedRecipe;
      } catch (error) {
        throw new Error("Error updating recipe: " + error.message);
      }
    },
    deleteRecipe: async (_, { id }) => {
      try {
        const recipe = await recipeModel.findById(id);
        if (!recipe) {
          throw new Error("Recipe not found");
        }

        const state = await recipeModel.findByIdAndDelete(id);
        if (state) {
          return true;
        }
      } catch (error) {
        throw new Error("Error deleting recipe: " + error.message);
      }
    },
    /** user authentications */
    signUp: async (_, { username, email, password }) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        if (!hashedPassword) {
          throw new Error("Error hashing password");
        }

        const newUser = new authenticationModel({
          username,
          email,
          password: hashedPassword,
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        const token = generateToken(savedUser,"1day");
        return { user: savedUser, token };
      } catch (error) {
        throw new Error("Error signing up: " + error.message);
      }
    },
    signIn: async (_, { username, password }) => {
      try {
        const user = await authenticationModel.findOne({ username });
        if (!user) {
          throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }
        const token = generateToken(user);
         
        return { user, token };
      } catch (error) {
        throw new Error("Error signing in: " + error.message);
      }
    },
    // refresh tokens
    refreshToken: async(_, { token }) => {
      try {
        const decodedToken = verifyToken(token);
        const user = await authenticationModel.findById(decodedToken.id);
        if (!user) {
          throw new Error("User not found");
        }
        const newToken = generateToken(user, "30d");
        return newToken;
      } catch (error) {
        throw new Error("Error refreshing token: " + error.message);
      }
    }
  },
};

export { resolvers};
