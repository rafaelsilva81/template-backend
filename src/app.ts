import fastify from "fastify";
import { env } from "./config/env";
import cors from "@fastify/cors";
import exampleRouter from "./routes/exampleRouter";

const bootstrap = async () => {
  const app = fastify({
    logger: env.NODE_ENV === "development",
  });

  app.register(cors);

  app.register(exampleRouter, { prefix: "/example" });

  await app.listen({
    port: env.PORT,
    host: "0.0.0.0",
  });

  await app.ready();
};

bootstrap()
  .then(() => {
    console.log(`Server is running on http://localhost:${env.PORT}`);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
