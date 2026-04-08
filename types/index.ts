export type InteractionAction = 'liked' | 'skipped' | 'saved' | 'shared';

export type Place = {
  id: string;           // Google place_id
  name: string;
  category: string;
  description: string;
  why_today: string;
  lat: number;
  lng: number;
  photos: string[];     // Array of photo URLs
  distance_km: number;
  vibe_tags: string[];  // e.g. ['Cozy', 'Aesthetic', 'Quiet']
  match_score?: number; // 0-100 taste match percentage (Explore tab)
  location_label?: string; // e.g. 'Chelsea, London'
};

export type Interaction = {
  place_id: string;
  action: InteractionAction;
  created_at: string;
};

export type TasteProfile = {
  primary_vibe: string;   // e.g. 'Brutalist Zen'
  top_textures: string[]; // e.g. ['Raw Concrete', 'Velvet', 'Oak']
  saved_count: number;
};

export type StreakHistoryEntry = {
  date: string;   // ISO date string
  active: boolean;
};
