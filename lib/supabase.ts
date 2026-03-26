import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

// TODO: Add AsyncStorage for session persistence once auth is wired up
// import AsyncStorage from '@react-native-async-storage/async-storage';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // storage: AsyncStorage,       // uncomment after installing async-storage
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
