import express from "express";
import dotenv from "dotenv";
import { apollo } from "./configs/apollo.config";
import { connectMongoDB } from "./configs/mongoose.config";
import { expressMiddleware } from "@apollo/server/express4";
import { corsConfig } from "./configs/cors.config";
import Error from "./providers/ErrorProvider";
dotenv.config();

const app = express();
app.use(express.json());
app.use(corsConfig);
const port = process.env.PORT || 3000;

connectMongoDB();

app.get("/", (_, res) => {
  res.send("Hello World");
});

const startApollo = async () => {
  await apollo.start();
  app.use("/graphql", expressMiddleware(apollo));
};

startApollo()
  .then(() => {
    app.listen(port, () => {
      console.log(
        `Express + Apollo Server running on http://localhost:${port}`
      );
    });
  })
  .catch((error) => {
    Error.getError(error);
  });
