import express from "express";
import morgan from "morgan";
import cors from "cors";
import contactsRouter from "./routes/contactsRouter.js";
import mongoose from "mongoose";
import "dotenv/config";

const {DB_HOST, PORT = 3000} = process.env;
const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

// Route for handling contacts
app.use("/api/contacts", contactsRouter);

// Handler for 404 - Route not found
app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

// General error handler
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

mongoose.connect(DB_HOST)
  .then(() => {
app.listen(PORT, () => {
  console.log(`Server is running. Use our API on port: ${PORT}`);
});
    console.log("Database connection successful")
  })
  .catch((err) => {
    console.log(err.message)
    process.exit(1)
  });