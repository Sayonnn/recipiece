import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./configs/apolloClient";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useEffect } from "react";
import { GraphQLProvider } from "./contexts/graphql";
import { listener } from "./utils/listeners";

function App() {

  useEffect(() => {
    const cleanup = listener.bgMusicToggler();
    return cleanup;
  }, []);

  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <GraphQLProvider>
                <Home />
              </GraphQLProvider>
            }
          />
          <Route path="/home/recipe/:id" element={<Home />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
