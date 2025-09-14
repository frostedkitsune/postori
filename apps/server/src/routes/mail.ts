import { Hono } from "hono";
import { supabase } from "../database";
import { cursorPaginate } from "../middleware/cursorPaginate";
import { fetchEmails } from "../utils/mailQuery";

const mail = new Hono();
const folders = ["inbox", "spam", "sent", "starred", "trash", "draft"];

// Routes with folder type
folders.forEach((folder) => {
  mail.get(`/${folder}`, cursorPaginate, async (c) => {
    const cursor = c.get("cursor");
    const limit = c.get("limit");

    const { data, error } = await fetchEmails(folder, cursor, limit);
    if (error) return c.json({ error: error.message }, 500);

    const nextCursor = data.length ? data[data.length - 1].created_at : null;
    return c.json({ emails: data, nextCursor });
  });
});

// Single mail route
mail.get("/:msg_id", async (c) => {
  const msgId = c.req.param("msg_id");
  const { data, error } = await supabase
    .from("emails")
    .select("*")
    .eq("msg_id", msgId)
    .single();

  if (error) return c.json({ error: error.message }, 500);
  return c.json(data);
});

export default mail;
