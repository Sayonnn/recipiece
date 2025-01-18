const typeDefs = `#graphql
# A type for an Item with feedback
type Item {
  id: ID!
  recipeName: String!
  description: String
  createdAt: String!
  thumbsUp: Int!
  thumbsDown: Int!
  ingredients: [Ingredient!]!
}

# A type for an Ingredient
type Ingredient {
  name: String!
  quantity: String
}

# Input type for adding or updating ingredients
input IngredientInput {
  name: String!
  quantity: String
}

# Queries for reading and getting recipes
type Query {
  getRecipes(limit: Int, offset: Int): [Item!]!
  getRecipe(id: ID!): Item
}

# Mutations for creating, updating, and deleting recipes
type Mutation {
  addIngredient(id: ID!, ingredient: IngredientInput!): Item!
  createRecipe(name: String!, description: String, ingredients: [IngredientInput!]!): Item!
  updateRecipe(id: ID!, name: String, description: String, ingredients: [IngredientInput!]): Item!
  deleteRecipe(id: ID!): Boolean
}

`;

export default typeDefs;
