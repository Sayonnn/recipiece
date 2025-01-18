import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import Error from "../providers/ErrorProvider";
import typeDefs from "../graphql/recipeTypes";
import resolvers from "../graphql/recipeResolver";

const apollo: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

// for nodeJS
const startApollo = async () => {
  try {
    const { url } = await startStandaloneServer(apollo, {
      listen: { port: 5000 },
    });
    if (url) {
      console.log("Apollo Server running at Port:", url);
      return url;
    }
  } catch (error) {
    Error.getError(500);
  }
};

export  {startApollo,apollo};
