import { createMiddleware } from "hono/factory";

declare module "hono" {
  interface ContextVariableMap {
    cursor: string | null;
    limit: number;
  }
}

const EMAILS_PER_PAGE = 10;

export const cursorPaginate = createMiddleware(async (c, next) => {
  const cursor = c.req.query("cursor") ?? null;
  c.set("cursor", cursor);
  c.set("limit", EMAILS_PER_PAGE);
  await next();
});
