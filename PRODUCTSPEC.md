## HTML frame from stitch UI/UX design

<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Wherely - Today's Curation</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400&amp;family=Manrope:wght@300;400;600;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              colors: {
                "surface-container-low": "#f4f4ef",
                "surface-container": "#edeee8",
                "on-tertiary-fixed-variant": "#5b694a",
                "error-container": "#fe8983",
                "primary": "#506359",
                "primary-dim": "#44564d",
                "surface-container-high": "#e7e9e2",
                "tertiary-dim": "#4a573a",
                "tertiary-container": "#e6f7cf",
                "secondary-fixed-dim": "#d6d5cb",
                "on-primary": "#e8fdf0",
                "on-primary-fixed": "#31433a",
                "outline-variant": "#afb3ac",
                "on-surface-variant": "#5c605a",
                "on-secondary-fixed-variant": "#5b5c54",
                "surface-bright": "#faf9f5",
                "on-error-container": "#752121",
                "inverse-on-surface": "#9d9d9a",
                "tertiary-fixed-dim": "#d8e8c1",
                "background": "#faf9f5",
                "secondary-dim": "#53544c",
                "inverse-primary": "#e4f9ec",
                "tertiary-fixed": "#e6f7cf",
                "secondary": "#5f6057",
                "on-primary-container": "#43564d",
                "on-secondary-fixed": "#3f4039",
                "secondary-fixed": "#e4e3d8",
                "on-error": "#fff7f6",
                "secondary-container": "#e4e3d8",
                "on-tertiary-container": "#515f40",
                "on-background": "#2f342e",
                "outline": "#787c75",
                "on-tertiary-fixed": "#3f4c2f",
                "primary-container": "#d3e7db",
                "surface-tint": "#506359",
                "surface": "#faf9f5",
                "surface-dim": "#d7dcd2",
                "primary-fixed-dim": "#c5d9cd",
                "on-secondary": "#fbf9ee",
                "surface-variant": "#e0e4db",
                "on-secondary-container": "#52524a",
                "on-tertiary": "#efffd7",
                "surface-container-highest": "#e0e4db",
                "on-primary-fixed-variant": "#4d6056",
                "surface-container-lowest": "#ffffff",
                "inverse-surface": "#0d0f0d",
                "on-surface": "#2f342e",
                "error-dim": "#4e0309",
                "primary-fixed": "#d3e7db",
                "error": "#9f403d",
                "tertiary": "#566445"
              },
              fontFamily: {
                "headline": ["Noto Serif"],
                "body": ["Manrope"],
                "label": ["Manrope"]
              },
              borderRadius: {"DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px"},
            },
          },
        }
      </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        }
        .serif-italic { font-family: 'Noto Serif', serif; font-style: italic; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container">
<!-- TopAppBar -->
<header class="w-full top-0 sticky z-50 flex justify-between items-center px-6 py-4 w-full no-border tonal-shift bg-[#faf9f5] dark:bg-[#1c1c1a]">
<div class="flex items-center gap-4">
<span class="material-symbols-outlined text-primary cursor-pointer hover:opacity-80 transition-opacity scale-95 duration-200">menu</span>
<div class="flex items-center gap-1 px-3 py-1 bg-surface-container-high rounded-full">
<span class="material-symbols-outlined text-[16px] text-primary" style="font-variation-settings: 'FILL' 1;">local_fire_department</span>
<span class="text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant">5-day streak</span>
</div>
</div>
<h1 class="text-2xl font-headline italic tracking-tight text-[#506359] dark:text-[#d3e7db]">The Curator</h1>
<div class="w-8 h-8 rounded-full overflow-hidden border border-outline-variant/20">
<img class="w-full h-full object-cover" data-alt="close-up portrait of a woman with a kind expression in soft natural lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMXGmI1ETwEOPoKYplCigdEQC-UOgKWOtQtW-1VH-FrM0PocFHWos0xcU53jnfzfxnyL61tS5nRyDosumUqRLcNEOeEnAjQfDA-e3xT8YERkZqk372wTOupmCdYt03faebZ4f2qjl99bHtp3Jkoq-oiNkBcq438Vbs-e4Ds8_H1NtnnHhO_9UuGKrYZERxX8gMFbPXgSXrIZdLvNw7uZ3rsVZtPNJAQDLUUDeS-QEklkXnqg_g5bh-0LQoVUFGjdBuMwxec4c9XerG"/>
</div>
</header>
<main class="max-w-screen-md mx-auto px-6 pt-4 pb-32">
<!-- Date Header -->
<div class="mb-8 text-center">
<p class="text-[10px] font-label font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-1">Today's Suggestion</p>
<h2 class="text-4xl font-headline italic text-on-surface">Monday, Oct 14</h2>
</div>
<!-- Featured Discovery Component -->
<section class="relative group">
<div class="bg-surface-container-lowest rounded-[2.5rem] overflow-hidden shadow-[0_8px_48px_rgba(47,52,46,0.08)] transition-all duration-500 hover:shadow-[0_12px_64px_rgba(47,52,46,0.12)]">
<!-- Image Gallery -->
<div class="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar h-[500px] relative">
<div class="flex-none w-full h-full snap-start relative">
<img class="w-full h-full object-cover" data-alt="serene interior of a minimalist cafe with wooden furniture, large windows, and soft morning sunlight filtering through willow trees outside" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwKYWJe2YP48ZX-ON6uUxriCBUd-ZMJZA-datjN-r2gV0FgsW0eqD3MajBvPxAb4D5d1VV_OG8xfivjAtNBCP35eE6dUqEhMWNAqCmDfrFVNu02bLgAybarGiUP7QPn84hzK5EcqLwGjkymv9FaAYvIpaPv20ZaTW7eSysJ7VDWCwG8fRLiqeAtrtC6_vLKGv5X4txtZdnlc-3UxvCqUoeEPaXLN93abDDebGnCpTk3pLxeP15pi_JnSX1PgargzJS--6HgLorDM93"/>
<div class="absolute inset-0 bg-gradient-to-t from-on-surface/40 via-transparent to-transparent"></div>
</div>
<div class="flex-none w-full h-full snap-start relative">
<img class="w-full h-full object-cover" data-alt="close-up of a perfectly poured latte with art on a rustic ceramic saucer on a light oak table" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvL6LBIUAUZ5XJGBYX5iRTbk8b3xcIPqnG_Ut7xv6lp_63PHhWOrFc9AKsXispVvphUdkZ9c8CRjq57vI7LaHvr7h0EqTu7-iMqYTH5iLTo3rG3eZ3yOEGassDZELnbWq0MvdSERL5xhO9Xd7mRL8jG0FfiSfOSgBTXH5J1tUtz_tLvh9mC4neOC9LnQyRayj032tA7quAzg8J0R711SA_KBkjB7RH6tFDmvvTBEM9BR0ObS1AEDiaNAEeLLUlgxJ68wzSmgzEHFSl"/>
<div class="absolute inset-0 bg-gradient-to-t from-on-surface/40 via-transparent to-transparent"></div>
</div>
</div>
<!-- Floating Tags -->
<div class="absolute top-6 left-6 flex gap-2">
<span class="px-3 py-1.5 bg-white/70 backdrop-blur-md rounded-full text-[10px] font-label font-bold uppercase tracking-wider text-primary">Cafe</span>
<span class="px-3 py-1.5 bg-white/70 backdrop-blur-md rounded-full text-[10px] font-label font-bold uppercase tracking-wider text-primary">1.2 km</span>
</div>
<!-- Content Overlay -->
<div class="absolute bottom-0 left-0 right-0 p-8 text-white">
<h3 class="text-5xl font-headline italic mb-2 leading-tight">The Willow Cafe</h3>
<p class="text-white/90 font-light max-w-sm mb-6">A quiet oasis for your morning brew.</p>
</div>
</div>
<!-- Quick Actions (Bento-style layout below card) -->
<div class="grid grid-cols-4 gap-4 mt-6">
<button class="col-span-1 aspect-square flex flex-col items-center justify-center bg-surface-container rounded-3xl hover:bg-surface-container-high transition-colors group">
<span class="material-symbols-outlined text-on-surface-variant group-hover:scale-110 transition-transform">thumb_up</span>
<span class="text-[9px] font-label font-bold uppercase mt-2 text-on-surface-variant">Like</span>
</button>
<button class="col-span-1 aspect-square flex flex-col items-center justify-center bg-surface-container rounded-3xl hover:bg-surface-container-high transition-colors group">
<span class="material-symbols-outlined text-on-surface-variant group-hover:scale-110 transition-transform">close</span>
<span class="text-[9px] font-label font-bold uppercase mt-2 text-on-surface-variant">Skip</span>
</button>
<button class="col-span-1 aspect-square flex flex-col items-center justify-center bg-surface-container rounded-3xl hover:bg-surface-container-high transition-colors group">
<span class="material-symbols-outlined text-on-surface-variant group-hover:scale-110 transition-transform">star</span>
<span class="text-[9px] font-label font-bold uppercase mt-2 text-on-surface-variant">Save</span>
</button>
<a class="col-span-1 aspect-square flex flex-col items-center justify-center bg-primary-container rounded-3xl hover:opacity-90 transition-opacity group" href="#">
<span class="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">map</span>
<span class="text-[9px] font-label font-bold uppercase mt-2 text-primary">Maps</span>
</a>
</div>
</section>
<!-- Context Section -->
<section class="mt-12 space-y-8">
<div class="p-8 bg-surface-container-low rounded-[2rem] border border-outline-variant/10">
<div class="flex items-center gap-3 mb-4">
<div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
<span class="material-symbols-outlined text-primary text-lg">auto_awesome</span>
</div>
<h4 class="font-label font-bold uppercase tracking-[0.15em] text-xs text-on-surface-variant">Why today?</h4>
</div>
<p class="text-xl font-headline italic leading-relaxed text-on-surface">
                    "Perfect for a sunny morning walk. The light hits the garden terrace between 9 and 11 AM, creating a peaceful sanctuary before the midday rush."
                </p>
</div>
<!-- Neighborhood Map Preview -->
<div class="relative h-48 rounded-[2rem] overflow-hidden">
<img class="w-full h-full object-cover" data-alt="a minimalist stylized map showing a quiet neighborhood with small parks and cafes highlighted in soft sage green tones" data-location="Paris" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgHQEodLqDi18FY1iItkVEbBncKCK5kpGuIHww_vyiIRqgMAvXOuoBFnZfyxIeGzk-89ETD1iVDwtgd2VOEQ3Mj0edtUPh0vPLn_eoHt_f-gbT0TupXzsRouKGC9Uk1zo4GIkdeMbL74PiUog789OxW-mWZDz-zrV5ZWQphyTGMeokz3OTLwo7YZgzE1t5laLdpre2kWbEdYpGOkHoyQFS6NfTOKIWu71iml_GhOWTWF0uOyP1JzLwNAAfXiimfuUBiVimWYc-l54G"/>
<div class="absolute inset-0 bg-primary/5"></div>
<div class="absolute inset-0 flex items-center justify-center">
<div class="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
<span class="material-symbols-outlined text-primary">near_me</span>
<span class="text-sm font-semibold text-primary">Explore surroundings</span>
</div>
</div>
</div>
</section>
</main>
<!-- BottomNavBar -->
<nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-8 pb-8 pt-4 bg-[#ffffff]/70 dark:bg-[#000000]/70 backdrop-blur-xl rounded-t-[2rem] shadow-[0_-8px_24px_rgba(47,52,46,0.06)]">
<a class="flex flex-col items-center justify-center bg-[#d3e7db] dark:bg-[#506359]/30 text-[#506359] dark:text-[#e8fdf0] rounded-full p-3 Active: scale-90 transition-all duration-300" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">home</span>
</a>
<a class="flex flex-col items-center justify-center text-[#2f342e]/50 dark:text-[#faf9f5]/40 p-3 hover:scale-110 transition-transform" href="#">
<span class="material-symbols-outlined">bookmark</span>
</a>
<a class="flex flex-col items-center justify-center text-[#2f342e]/50 dark:text-[#faf9f5]/40 p-3 hover:scale-110 transition-transform" href="#">
<span class="material-symbols-outlined">settings</span>
</a>
</nav>
</body></html>


## Product Concept
Concept
A daily curated place discovery app — one featured spot per day, with an editorial, slow-living aesthetic. The streak mechanic suggests habitual daily check-ins.

What works well
•  The typography pairing (Noto Serif italic + Manrope) gives it a premium, editorial feel that differentiates it from typical local discovery apps
•  The "Why today?" AI context section is a strong differentiator — it gives intent to the curation rather than just showing a place
•  The bento-style quick actions (Like / Skip / Save / Maps) are clean and appropriately minimal
•  Color palette is cohesive and calm — the sage greens feel intentional for a "slow discovery" UX
•  The streak indicator is a subtle but effective retention hook

Things to consider
•  The app name in the header says "The Curator" but the project is called Wherely — worth deciding which direction to commit to. They have very different positioning (editorial brand vs. location utility)
•  Only 3 bottom nav items (Home, Bookmarks, Settings) — if you add features like social or a map view, this will need to scale
•  The single-place-per-day mechanic is bold and distinctive, but you may want a "see more" escape hatch for power users who want to explore beyond today's pick
•  The map preview is decorative right now — consider whether tapping it should open a real interactive map

What kind of work are you looking to do next — build this out in code, or iterate on the design?
I want you to build a mvp of this this mobile application. 

the tech stack goal I want is 
front-end: react-native (expo) and supports expogo mobile app to test.

Let me give you a product spec and insight. 

🧠 Product: “Wherely”

A minimalist app that gives you one curated place to go each day.

⸻

🎯 Core Concept

“Open the app → see one place → decide if you’ll go.”

	•	No scrolling feeds
	•	No overwhelm
	•	Just one high-quality suggestion per day

⸻

🧩 Core User Loop (Daily Habit)
	1.	User opens app in morning
	2.	Sees today’s place
	3.	Reacts:
	•	👍 Interested
	•	👎 Skip
	•	⭐ Save
	4.	Optional: navigates there later
	5.	Next day → new place

👉 That’s the entire loop. Keep it sacred.

⸻

🔑 MVP FEATURES (V1)

1. Daily Place Card (MAIN FEATURE)

Pulled from Google Places API

Data shown:
	•	Name
	•	1–3 photos
	•	Category (café, park, restaurant, etc.)
	•	Distance from user
	•	Short AI-generated description
	•	“Why today?” (e.g. “Perfect sunny-day spot”)

⸻

2. User Actions (Simple but important)
	•	👍 Like
	•	👎 Skip
	•	⭐ Save
	•	📍 Open in maps (deep link)

⸻

3. Basic Personalisation (Lightweight AI layer)
	•	Track:
	•	liked places
	•	skipped places
	•	categories
	•	Adjust future suggestions

⸻

4. Streak System (Soft, not aggressive)
	•	“You’ve checked Wherely 5 days in a row”

⸻

5. Saved Places List
	•	Simple list of starred places
	•	Tap → view again / navigate

⸻

6. Location Radius Setting
	•	e.g. 2km / 5km / 10km

⸻

🚀 V2 FEATURES (AFTER MVP)
	•	“Mood filter” (chill, social, productive)
	•	Time-based suggestions (morning café vs dinner spot)
	•	“Go with a friend” sharing
	•	Collections (Date spots, Study spots, Hidden gems)
	•	Push notifications (“Today’s spot is 🔥”)

⸻

📱 APP STRUCTURE (SCREENS & UX)

Keep it VERY minimal:

👉 3–4 tabs MAX

⸻

🏠 1. HOME (Daily Place Screen)

This is 90% of the app’s value

Layout:

Top:
	•	Date (“Friday, March 27”)
	•	Small streak indicator 🔥

Center (Hero Card):
	•	Large image (full width, aesthetic)
	•	Place name
	•	Category + distance

Below image:
	•	Short description (1–2 lines)
	•	“Why today?” line (subtle highlight)

Bottom actions (big buttons):
	•	👍 Like
	•	👎 Skip
	•	⭐ Save

Footer:
	•	“Open in Maps” button

⸻

👉 UX Goal:
User can process everything in <5 seconds

⸻

🗺️ 2. MAP VIEW (Optional but useful)

Purpose:
	•	See today’s place on a map
	•	See saved places

Layout:
	•	Map centered on user
	•	Pins:
	•	Today’s place (highlighted)
	•	Saved places

⸻

👉 Keep this secondary, not the main experience

⸻

⭐ 3. SAVED (Library)

Layout:
	•	Vertical list of saved places

Each item:
	•	Thumbnail
	•	Name
	•	Distance
	•	Category

Tap → opens detail view (same as home card)

⸻

⚙️ 4. PROFILE / SETTINGS

Keep minimal:
	•	Location radius
	•	Preferences (optional later)
	•	Notification toggle
	•	Reset preferences

⸻

🎨 DESIGN DIRECTION

Style:
	•	Clean, modern, slightly “lifestyle aesthetic”
	•	Think:
	•	Airbnb
	•	Instagram minimalism
	•	Apple-like spacing

Key design principle:

👉 Make the place look irresistible
