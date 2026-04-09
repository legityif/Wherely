# Wherely

> A minimalist app that gives you one curated place to go each day.

## Stack

- **Frontend:** React Native (Expo Router)
- **Backend:** Supabase (PostgreSQL + Edge Functions)
- **APIs:** Google Places API, Gemini (optional)
- **Styling:** NativeWind (TailwindCSS for RN)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
# Fill in your Supabase URL and anon key
```

### 3. Run on Expo Go

```bash
npx expo start
```

Scan the QR code with the Expo Go app on your phone.

## Project Structure

```
app/
  (tabs)/
    index.tsx       # Home — Daily Place Card
    map.tsx         # Map view
    saved.tsx       # Saved places
    settings.tsx    # Settings
  place/[id].tsx    # Place detail screen
components/
  PlaceCard.tsx     # Hero image card
  ActionBar.tsx     # Like / Skip / Save / Maps
  StreakBadge.tsx   # 🔥 streak indicator
  SavedPlaceRow.tsx # Row item for saved list
lib/
  supabase.ts       # Supabase client
  places.ts         # Places API helpers
  location.ts       # Expo Location wrapper
hooks/
  useDailyPlace.ts  # Fetches today's suggestion
  useSavedPlaces.ts # Reads saved interactions
  useStreak.ts      # Streak logic
store/
  useUserStore.ts   # Zustand — radius, interactions
supabase/
  migrations/       # SQL schema
  functions/
    daily-place/    # Edge Function — selects today's place
```

## Supabase Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the migration: paste `supabase/migrations/001_initial_schema.sql` into the SQL editor
3. Deploy the Edge Function:
   ```bash
   supabase functions deploy daily-place
   supabase secrets set GOOGLE_PLACES_API_KEY=your-key
   supabase secrets set GEMINI_API_KEY=your-key   # optional
   ```

## Development Notes

- The app currently uses **mock data** (The Willow Cafe) until the Edge Function is wired up.
- To connect to real data: uncomment the `supabase.functions.invoke` call in `hooks/useDailyPlace.ts`. (done)
- Map tab requires a real device or simulator with location access.

## V2 Roadmap

- Mood filter (chill / social / productive)
- Time-based suggestions, season based, weather based suggestions
- "Go with a friend" sharing, friend interactions on your daily drop
- Push notifications
- Collections (Date spots, Hidden gems, etc.)
