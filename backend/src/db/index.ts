import mongoose from "mongoose";
import { MONGODB_URI, DB_NAME } from "#config";

try {
  const clinet = await mongoose.connect(MONGODB_URI, {
    dbName: DB_NAME,
  });
  console.log(`Connected to MongoDB: ${clinet.connection.name}`);
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
  process.exit(1);
}
