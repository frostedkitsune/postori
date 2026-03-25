import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { supabaseConnection } from "./database";

// import routes
import email from "./routes/email";
import mail from "./routes/mail";

// main app
const app = new Hono();

// middlewares
app.use(logger());

app.use(
  "/*",
  cors({
    origin: ["http://localhost:5173"],
    allowMethods: ["POST", "GET", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

// supabase connection fire
supabaseConnection().then(() => {
  console.log(`Server is running on 3000`);
});

// Base route
app.get("/", (c) => c.text("Mail Service is Live"));

// 404 route
app.get("/notfound", (c) => c.notFound());

// Connect route groups
const api = app.basePath("/api");
api.route("/email", email);

const mailApp = app.basePath("/mail");
mailApp.route("/", mail);

export default app;
