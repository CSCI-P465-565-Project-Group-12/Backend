import { createClient } from '@supabase/supabase-js';


// Supabase service role key and URL from your Supabase project settings
const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 