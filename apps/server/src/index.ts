import { Hono } from "hono";
import { cors } from "hono/cors";
import email from "./routes/email";

const app = new Hono()

  // middlewares
  .use(
    "/api/*",
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    }),
  )

  // basepath
  .basePath("/api")

  // routes
  .route("/email", email);

export default app;
