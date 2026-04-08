import { useUserStore } from '@/store/useUserStore';

type StreakState = {
  streak: number;
};

export function useStreak(): StreakState {
  const { profile } = useUserStore();
  
  // The actual logic of updating the streak runs on app launch inside useUserStore.updateStreak()
  // Here we just read the reactive state so components re-render when it changes.
  return { streak: profile?.streak_count || 0 };
}
