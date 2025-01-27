// src/apolloClient.js
import { ApolloClient, InMemoryCache } from '@apollo/client';
const apiURI = 'https://recipiece.onrender.com/graphql'

const client = new ApolloClient({
  uri: apiURI, 
  cache: new InMemoryCache(),
  // credentials: 'same-origin',
});

export default client;
