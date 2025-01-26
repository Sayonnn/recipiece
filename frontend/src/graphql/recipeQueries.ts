import { gql } from "@apollo/client";

// Queries
export const GET_RECIPES = gql`
  query GetRecipes($limit: Int, $offset: Int) {
    getRecipes(limit: $limit, offset: $offset) {
      id
      recipeName
      description
      ingredients {
        name
        quantity
      }
    }
  }
`;

export const GET_RECIPE = gql`
  query GetRecipe($id: ID!) {
    getRecipe(id: $id) {
      id
      recipeName
      description
      ingredients {
        name
        quantity
      }
    }
  }
`;

// Mutations
export const CREATE_RECIPE = gql`
  mutation CreateRecipe(
    $name: String!
    $description: String
    $ingredients: [IngredientInput!]!
  ) {
    createRecipe(
      name: $name
      description: $description
      ingredients: $ingredients
    ) {
      id
      recipeName
      description
      ingredients {
        name
        quantity
      }
    }
  }
`;

export const UPDATE_RECIPE = gql`
  mutation UpdateRecipe(
    $id: ID!
    $name: String
    $description: String
    $ingredients: [IngredientInput!]
  ) {
    updateRecipe(
      id: $id
      name: $name
      description: $description
      ingredients: $ingredients
    ) {
      id
      recipeName
      description
      ingredients {
        name
        quantity
      }
    }
  }
`;

export const DELETE_RECIPE = gql`
  mutation DeleteRecipe($id: ID!) {
    deleteRecipe(id: $id)
  }
`;
