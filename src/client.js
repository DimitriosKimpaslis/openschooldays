import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_API_URL
const supabaseKey = process.env.REACT_APP_API_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey);