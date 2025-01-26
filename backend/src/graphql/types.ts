export const typeDefs = `#graphql
# === recipe types ===
# item type
type Item { 
  id: ID!
  recipeName: String!
  description: String
  createdAt: String!
  thumbsUp: Int!
  thumbsDown: Int!
  ingredients: [Ingredient!]!
}

# ingredient type
type Ingredient {
  name: String!
  quantity: String
}

# recipe input
input IngredientInput {
  name: String
  quantity: String
}

# === user types ===
# User
type User {
  id: ID!
  username: String!
  email: String!
  createdAt: String!
}

# Auth Input
input AuthInput {
  username: String!
  email: String!
  password: String!
}

type AuthPayload {
  user: User!
  token: String!
}

# =================== Query and Mutations =========================
type Query {
  getRecipes(limit: Int, offset: Int): [Item!]!
  getRecipe(id: ID!): Item
  getUser(id: ID!): User!
}

type Mutation {
  # recipe mutations
  addIngredient(id: ID!, ingredient: IngredientInput!): Item!
  createRecipe(name: String!, description: String, ingredients: [IngredientInput!]!): Item!
  updateRecipe(id: ID!, name: String, description: String, ingredients: [IngredientInput!]): Item!
  deleteRecipe(id: ID!): Boolean

  # authentication mutations
  signUp(input: AuthInput!): AuthPayload!
  signIn(input: AuthInput!): AuthPayload!

  # refresh token
  refreshToken(token: String!): String!
}

`;
