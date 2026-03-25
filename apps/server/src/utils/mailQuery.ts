import { supabase } from "../database";

const selectFields =
  "id, msg_id, subject, from_address, to_addresses, unread, folder_name, created_at";

export async function fetchEmails(
  folder: string,
  cursor: string | null,
  limit: number,
) {
  let query = supabase
    .from("emails")
    .select(selectFields)
    .eq("folder_name", folder)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (cursor) query = query.lt("created_at", cursor);

  return query;
}
