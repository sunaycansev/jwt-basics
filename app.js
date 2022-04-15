import dotenv from "dotenv";
import "express-async-errors";
import express from "express";
const app = express();
dotenv.config();
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import mainRouter from "./routes/main.js";

// middleware
app.use(express.static("./public"));
app.use(express.json());

// routes
app.use("/api/v1", mainRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
