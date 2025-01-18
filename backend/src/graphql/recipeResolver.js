import recipeModel from "../models/recipeModels";

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
    createRecipe: async (_, { name, description, ingredients }) => {
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
  },
};

export default resolvers;
