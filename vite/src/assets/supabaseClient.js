import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase project URL and public API key
const SUPABASE_URL = 'https://pgoljqkfwptcraxzrjfq.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnb2xqcWtmd3B0Y3JheHpyamZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkzMzY1NTEsImV4cCI6MjAzNDkxMjU1MX0.VKTs4rKP8r4-5uMZ_rhBG4IG_58SJOXSAHdu_EbWWhA';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;