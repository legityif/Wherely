import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const GOOGLE_PLACES_API_KEY = Deno.env.get('GOOGLE_PLACES_API_KEY')!;
const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

type RequestBody = {
  lat: number;
  lng: number;
  radius_km: number;
};

Deno.serve(async (req) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const authHeader = req.headers.get('Authorization');
    const { data: { user } } = await supabase.auth.getUser(
      authHeader?.replace('Bearer ', '') ?? ''
    );
    if (!user) throw new Error('Unauthorized');

    const { lat, lng, radius_km = 5 }: RequestBody = await req.json();

    // 1. Check if today's pick already exists
    const today = new Date().toISOString().slice(0, 10);
    const { data: existingPick } = await supabase
      .from('daily_picks')
      .select('place_id, places(*)')
      .eq('user_id', user.id)
      .eq('date', today)
      .single();

    if (existingPick) {
      return new Response(JSON.stringify(existingPick.places), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 2. Fetch previously interacted place IDs (filter out)
    const { data: interactions } = await supabase
      .from('interactions')
      .select('place_id')
      .eq('user_id', user.id);
    const excludeIds = new Set((interactions ?? []).map((i: { place_id: string }) => i.place_id));

    // 3. Call Google Places Nearby Search
    const radiusMeters = radius_km * 1000;
    const googleRes = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json` +
      `?location=${lat},${lng}&radius=${radiusMeters}&type=cafe|restaurant|park` +
      `&key=${GOOGLE_PLACES_API_KEY}`
    );
    const googleData = await googleRes.json();
    const candidates = (googleData.results ?? []).filter(
      (p: { place_id: string }) => !excludeIds.has(p.place_id)
    );

    if (candidates.length === 0) {
      return new Response(JSON.stringify(null), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 4. Pick the top candidate (highest rating + photos)
    const top = candidates.sort((a: { rating?: number; photos?: unknown[] }, b: { rating?: number; photos?: unknown[] }) => {
      const scoreA = (a.rating ?? 0) + (a.photos?.length ? 1 : 0);
      const scoreB = (b.rating ?? 0) + (b.photos?.length ? 1 : 0);
      return scoreB - scoreA;
    })[0];

    // 5. Build photo URLs
    const photos: string[] = (top.photos ?? []).slice(0, 3).map((p: { photo_reference: string }) =>
      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${p.photo_reference}&key=${GOOGLE_PLACES_API_KEY}`
    );

    // 6. Generate "why today?" with Gemini (optional — falls back to template)
    let whyToday = `A great ${top.types?.[0]?.replace(/_/g, ' ') ?? 'spot'} worth visiting today.`;
    if (GEMINI_API_KEY) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: `Write a single evocative sentence (max 20 words) explaining why "${top.name}" is a great place to visit today. Focus on atmosphere, time of day, or mood. No emoji.`
                }]
              }]
            }),
          }
        );
        const geminiData = await geminiRes.json();
        whyToday = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ?? whyToday;
      } catch {
        // Silently fall back to template
      }
    }

    // 7. Upsert place into cache
    const place = {
      id: top.place_id,
      name: top.name,
      category: top.types?.[0]?.replace(/_/g, ' ') ?? 'place',
      lat: top.geometry.location.lat,
      lng: top.geometry.location.lng,
      photos,
      description: top.vicinity ?? '',
      why_today: whyToday,
      cached_at: new Date().toISOString(),
    };

    await supabase.from('places').upsert(place);

    // 8. Record the daily pick
    await supabase.from('daily_picks').insert({
      user_id: user.id,
      place_id: place.id,
      date: today,
    });

    return new Response(JSON.stringify(place), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
