import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { PORT, mongodbURL } from "./config.js";
import booksRoute from "./routes/booksRoute.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY

// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());

// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome To MERN Stack Tutorial");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongodbURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
