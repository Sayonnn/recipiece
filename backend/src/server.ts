import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { apollo } from "./configs/apollo";
import connectMongoDB from "./configs/connectMongoDB";
import { expressMiddleware } from "@apollo/server/express4";
import Error from "./providers/ErrorProvider";
import corsConfig from "./configs/corsConfig";

const app = express();
app.use(express.json())
app.use(corsConfig)
const port = process.env.PORT || 3000;

connectMongoDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});

const startApollo = async () => {
  await apollo.start();
  app.use("/graphql", expressMiddleware(apollo));
};

startApollo()
  .then(() => {
    app.listen(port, () => {
      console.log(`Express + Apollo Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    Error.getError(error);
  });
