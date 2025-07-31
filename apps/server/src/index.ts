import { Hono } from 'hono';
import { cors } from 'hono/cors';
import email from './routes/email';

const app = new Hono();

app.use("/api/*", cors({
  origin: "http://localhost:5173",
  credentials: true
}))


export const routes = app
  .basePath("/api")
  .route("/email", email);

export default app;
