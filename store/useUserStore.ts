import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { TasteProfile, StreakHistoryEntry } from '@/types';

type Profile = {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  radius_km: number;
  streak_count: number;
  last_opened_at: string | null;
  taste_profile: TasteProfile;
  streak_history: StreakHistoryEntry[];
};

type UserStore = {
  profile: Profile | null;
  loading: boolean;
  fetchProfile: () => Promise<void>;
  setRadiusKm: (r: number) => Promise<void>;
  updateStreak: () => Promise<void>;
  clearProfile: () => void;
};

export const useUserStore = create<UserStore>((set, get) => ({
  profile: null,
  loading: false,

  fetchProfile: async () => {
    set({ loading: true });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        set({ profile: null, loading: false });
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      // Merge with defaults for new fields not yet in DB
      const profile: Profile = {
        id: data.id,
        display_name: data.display_name ?? null,
        avatar_url: data.avatar_url ?? null,
        radius_km: data.radius_km ?? 5,
        streak_count: data.streak_count ?? 0,
        last_opened_at: data.last_opened_at ?? null,
        taste_profile: data.taste_profile ?? {
          primary_vibe: 'Brutalist Zen',
          top_textures: ['Raw Concrete', 'Velvet', 'Oak'],
          saved_count: 0,
        },
        streak_history: data.streak_history ?? [],
      };
      set({ profile });
    } catch (e) {
      console.error('Failed to fetch profile:', e);
    } finally {
      set({ loading: false });
    }
  },

  setRadiusKm: async (radius_km: number) => {
    const { profile } = get();
    if (!profile) return;

    // DB constraint allows only 2, 5, 10 — snap to the nearest allowed value
    const ALLOWED = [2, 5, 10] as const;
    const clamped = ALLOWED.reduce((best, v) =>
      Math.abs(v - radius_km) < Math.abs(best - radius_km) ? v : best
    );

    // Optimistic update
    set({ profile: { ...profile, radius_km: clamped } });

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ radius_km: clamped })
        .eq('id', profile.id);

      if (error) throw error;
    } catch (e) {
      console.error('Failed to update radius:', e);
      // Revert on failure
      set({ profile });
    }
  },

  updateStreak: async () => {
    const { profile } = get();
    if (!profile) return;

    const todayStr = new Date().toISOString().split('T')[0];
    const lastOpenedStr = profile.last_opened_at ? profile.last_opened_at.split('T')[0] : null;

    if (lastOpenedStr === todayStr) {
      return; // Already opened today, streak is up to date
    }

    let newStreak = 1;
    if (lastOpenedStr) {
      const yesterday = new Date(Date.now() - 86_400_000).toISOString().split('T')[0];
      if (lastOpenedStr === yesterday) {
        newStreak = profile.streak_count + 1; // Continuous streak
      }
      // Else, streak resets to 1 (missed a day)
    }

    const now = new Date().toISOString();
    
    // Optimistic update
    set({ profile: { ...profile, streak_count: newStreak, last_opened_at: now } });

    try {
      await supabase
        .from('profiles')
        .update({ streak_count: newStreak, last_opened_at: now })
        .eq('id', profile.id);
    } catch (e) {
      console.error('Failed to update streak:', e);
    }
  },

  clearProfile: () => set({ profile: null }),
}));
