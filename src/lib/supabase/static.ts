import { createClient } from '@supabase/supabase-js';

// Create a default Supabase client used for static params generation
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
