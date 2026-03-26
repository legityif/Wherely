# Design System Strategy: The Curated Horizon

## 1. Overview & Creative North Star: "The Digital Curator"
This design system is built to feel less like a mobile application and more like a high-end, tactile editorial journal. The **Creative North Star** is "The Digital Curator." We are moving away from the "app-like" rigidity of standard grids and buttons toward a layout that feels discovered rather than programmed. 

To achieve this premium, bespoke feel, we utilize **intentional asymmetry**—offsetting headings from body text or allowing imagery to break the standard container bounds—and **tonal depth**. By rejecting harsh lines in favor of soft color shifts, we create a "breathable" atmosphere that reduces cognitive load and invites exploration.

---

## 2. Colors: Tonal Atmosphere
The palette is a sophisticated study in warm neutrals and organic sage tones. We avoid pure blacks and whites to maintain a "paper-like" warmth.

### The "No-Line" Rule
**Explicit Instruction:** You are prohibited from using 1px solid borders to section off content. Structural boundaries must be defined solely through background color shifts. For example, a `surface-container-low` (`#f4f4ef`) section should sit atop a `surface` (`#faf9f5`) background. The human eye will perceive the change in depth without the "cheapening" effect of a stroke.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—stacked sheets of fine vellum.
- **Base Layer:** `surface` (#faf9f5)
- **Secondary Content:** `surface-container-low` (#f4f4ef)
- **Interactive Elements/Cards:** `surface-container-highest` (#e0e4db)
- **Emphasis Containers:** `primary-container` (#d3e7db)

### The "Glass & Gradient" Rule
For floating navigation or high-end modals, use **Glassmorphism**. Apply `surface-container-lowest` (#ffffff) at 70% opacity with a `20px` backdrop blur. 
**Signature Textures:** For primary CTAs, do not use flat colors. Apply a subtle linear gradient from `primary` (#506359) to `primary-dim` (#44564d) at a 45-degree angle to add a "silken" finish.

---

## 3. Typography: The Editorial Voice
Our typography pairing is the backbone of the "Curated" feel, balancing the authority of a serif with the modern utility of a sans-serif.

*   **Display & Headlines (Noto Serif):** These are your "Editorial Anchors." Use `display-lg` (3.5rem) with wide tracking (-0.02em) for discovery headers. The serif conveys a sense of history and curation.
*   **Body & UI (Manrope):** A clean, geometric sans-serif used for all functional elements. It ensures high legibility at small scales (`body-sm` at 0.75rem).
*   **Hierarchy as Identity:** Always lead with a large Serif headline, but pair it with a `label-md` (0.75rem) in all-caps with 10% letter spacing above it to act as a "Category Tag."

---

## 4. Elevation & Depth: Tonal Layering
We do not use elevation to "lift" objects; we use it to "settle" them.

*   **The Layering Principle:** Instead of a shadow, place a `surface-container-lowest` card inside a `surface-container` area. The subtle shift from #edeee8 to #ffffff provides all the hierarchy needed.
*   **Ambient Shadows:** If an element must float (e.g., a FAB or a floating menu), use a "Soft Ambient" shadow:
    *   *Offset: 0, 8px | Blur: 24px | Color: #2f342e (at 6% opacity).*
*   **The "Ghost Border" Fallback:** If accessibility requires a container edge, use the `outline-variant` (#afb3ac) at **15% opacity**. Never use 100% opacity for borders.
*   **Glassmorphism & Depth:** Use semi-transparent layers for bottom navigation bars to allow the "discovery content" to bleed through, maintaining a sense of place.

---

## 5. Components: Refined Primitives

### Buttons
*   **Primary:** Background: Gradient `primary` to `primary-dim`. Corner Radius: `xl` (1.5rem). Type: `title-sm` (Manrope, #e8fdf0).
*   **Secondary:** Background: `surface-container-high`. No border. Corner Radius: `lg` (1rem).
*   **Tertiary:** No background. Underline using `primary` at 30% opacity, 2px thickness, offset by 4px.

### Cards & Discovery Lists
*   **The Card Rule:** Forbid the use of divider lines. Separate list items using `spacing-6` (2rem) of vertical white space or by alternating background tiers (`surface-container-low` vs `surface-container-highest`).
*   **Radius:** All cards must use `xl` (1.5rem / 24px) corner radius to feel soft and approachable.

### Input Fields
*   **Visual Style:** Ghost-style inputs. Use `surface-container-low` with a `title-sm` font. Labels should be `label-md` and placed 0.5rem above the input.
*   **States:** On focus, transition the background color to `surface-container-high` and add a 1px "Ghost Border" of `primary` at 20% opacity.

### Featured Discovery Component (Signature)
A bespoke component for "Daily Discovery." A large image container with a `1.5rem` radius, featuring a `display-sm` Serif headline overlaid in the bottom-left corner on a semi-transparent `surface-dim` glass blur.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use generous white space. If you think there is enough space, add `spacing-4` more.
*   **Do** use `primary-fixed-dim` for "Save" or "Like" actions to feel permanent and calm.
*   **Do** let images bleed to the edge of the screen occasionally to break the "container" feel.

### Don’t:
*   **Don’t** use pure black (#000) for text. Always use `on-surface` (#2f342e).
*   **Don’t** use standard Material Design "Drop Shadows." They are too aggressive for this aesthetic.
*   **Don’t** use "Alert Red" for errors. Use the sophisticated `error` (#9f403d) which is muted and less jarring.
*   **Don’t** use more than one Serif font weight on a single screen. Let size and scale do the work, not thickness.

---
**Director's Note:** Every pixel should feel like a choice. If an element doesn't have a functional or aesthetic purpose, remove it. We are building a sanctuary for discovery, not a warehouse of data.