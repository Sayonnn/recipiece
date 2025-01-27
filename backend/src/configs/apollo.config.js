import { ApolloServer } from "@apollo/server";
import { typeDefs } from "../graphql/types.js";
import { resolvers } from "../graphql/resolvers.js";
import { context } from "../middlewares/jwt.middleware.js";

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

export {  apollo };
