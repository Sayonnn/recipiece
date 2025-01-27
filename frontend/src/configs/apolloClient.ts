// src/apolloClient.js
import { ApolloClient, InMemoryCache } from '@apollo/client';
const apiURI = 'http://localhost:8081/graphql'

const client = new ApolloClient({
  uri: apiURI, 
  cache: new InMemoryCache(),
  credentials: 'same-origin',
});

export default client;
