export type InteractionAction = 'liked' | 'skipped' | 'saved';

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
};

export type Interaction = {
  place_id: string;
  action: InteractionAction;
  created_at: string;
};
