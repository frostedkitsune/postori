import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase credentials are missing!");
}

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

const supabaseConnection = async () => {
  try {
    console.log("Supabase Client Initialized *_* ");
  } catch (error) {
    console.error("Supabase initialization failed !!!", error);
  }
};

export { supabase, supabaseConnection };
