// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://wpvhufagwliffzrdbspq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indwdmh1ZmFnd2xpZmZ6cmRic3BxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MDI5NTMsImV4cCI6MjA2MDI3ODk1M30.zgY_uF5Lxunw2uV5q9gWgBk-so_-w7DQRJnKiFMptpA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);