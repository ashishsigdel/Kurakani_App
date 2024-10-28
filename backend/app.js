import express from "express";
import { createServer } from "http";
import ApiError from "./utils/apiError.js";
import ApiResponse from "./utils/apiResponse.js";

import apiRoute from "./routes/index.js";

const app = express();

app.use(express.json());

const httpServer = createServer(app);

app.use("/api", apiRoute);

app.use((req, res, next) => {
  throw new ApiError({
    status: 404,
    message: "URL not found!",
    errors: [
      {
        message: `Cannot ${req.method} ${req.originalUrl} !!!`,
      },
    ],
  });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: err.status,
    message: err.message,
    errors: err.errors,
  });
});

export { app };

export default httpServer;