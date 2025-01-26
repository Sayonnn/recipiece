import mongoose from "mongoose";
import Error from "../providers/ErrorProvider";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log("Mongoose connected to MongoDB");
  } catch (error) {
    console.log(error)
    Error.getError(400)
  }
};

export { connectMongoDB};
