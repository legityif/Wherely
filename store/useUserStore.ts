import { create } from 'zustand';
import { InteractionAction } from '@/types';

type Interaction = {
  placeId: string;
  action: InteractionAction;
};

type UserStore = {
  radiusKm: 2 | 5 | 10;
  interactions: Interaction[];
  setRadiusKm: (r: 2 | 5 | 10) => void;
  addInteraction: (placeId: string, action: InteractionAction) => void;
  getSavedPlaceIds: () => string[];
  resetPreferences: () => void;
};

export const useUserStore = create<UserStore>((set, get) => ({
  radiusKm: 5,
  interactions: [],

  setRadiusKm: (r) => set({ radiusKm: r }),

  addInteraction: (placeId, action) =>
    set((state) => ({
      interactions: [
        // Replace any existing interaction for this place
        ...state.interactions.filter((i) => i.placeId !== placeId),
        { placeId, action },
      ],
    })),

  getSavedPlaceIds: () =>
    get()
      .interactions.filter((i) => i.action === 'saved')
      .map((i) => i.placeId),

  resetPreferences: () => set({ interactions: [] }),
}));
