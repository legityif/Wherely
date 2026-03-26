import { useState, useEffect } from 'react';

const STREAK_KEY = 'wherely_streak';
const LAST_OPENED_KEY = 'wherely_last_opened';

// Simple in-memory streak for now.
// TODO: Persist to Supabase `profiles.streak_count` + `last_opened_at`.
let memStreak = 0;
let memLastOpened = '';

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function updateStreak() {
  const today = todayStr();
  if (memLastOpened === today) return memStreak;

  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
  if (memLastOpened === yesterday) {
    memStreak += 1;
  } else if (memLastOpened === '') {
    memStreak = 1;
  } else {
    memStreak = 1; // Reset — missed a day
  }
  memLastOpened = today;
  return memStreak;
}

type StreakState = {
  streak: number;
};

export function useStreak(): StreakState {
  const [streak, setStreak] = useState(memStreak);

  useEffect(() => {
    const updated = updateStreak();
    setStreak(updated);
  }, []);

  return { streak };
}
