import mongoose from "mongoose";

// Connect to MongoDB

const connectDB = async () => {
  mongoose.connection.on("connected", () => console.log("Database Connected"));

  await mongoose.connect(`${process.env.MONGODB_URI}/quicklearn`);
};

export default connectDB;
