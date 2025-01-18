// src/apolloClient.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:8081/graphql', 
  cache: new InMemoryCache(),
  credentials: 'same-origin',
});

export default client;
