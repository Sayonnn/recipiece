import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {  ApolloProvider } from "@apollo/client";
import client from "./configs/apolloClient.ts";
import "./index.css";
import App from "./App.tsx";
import { GraphQLProvider } from "./contexts/graphql.js";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <GraphQLProvider>
        <App />
      </GraphQLProvider>
    </ApolloProvider>
  </StrictMode>
);
