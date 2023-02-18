import express from "express";
import { env } from "./config/env";
import morgan from "morgan";
import cors from "cors";
import exampleRouter from "./routes/exampleRouter";

async function bootstrap() {
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));
  app.use(cors({ exposedHeaders: "Authorization" }));
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.use("/example", exampleRouter);

  app.listen(env.PORT, () => {
    console.debug(`Server is running on port http://localhost:${env.PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error(err);
});
