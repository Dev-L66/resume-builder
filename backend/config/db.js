import mongoose from "mongoose"

export const connectToDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to DB: ${connection.connection.host}`);
  } catch (error) {
    console.log(`Error while connecting to DB: ${error.message}`);
    process.exit(1);
  }
};
