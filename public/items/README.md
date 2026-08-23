# Minecraft Item Icons Directory (`/public/items/`)

Place item icon images in this folder (e.g. `.png` format). The website automatically detects and renders these icons in the **Material List Checklist** and **Schematic Viewer**.

## 🎨 How Naming Works
When an item name appears in a farm's material list (e.g., `Smooth Stone`, `Hoppers`, `Water Bucket`), the system looks for an image matching any of the following conventions:

1. **Snake Case (Recommended):**
   - `Smooth Stone` ➔ `smooth_stone.png`
   - `Water Bucket` ➔ `water_bucket.png`
   - `Sticky Pistons` ➔ `sticky_piston.png` or `sticky_pistons.png`
   - `Redstone Dust` ➔ `redstone_dust.png`
   - `Double Chests` ➔ `double_chest.png` or `chest.png`

2. **Kebab Case:**
   - `smooth-stone.png`
   - `water-bucket.png`

3. **Singular & Plural Tolerant:**
   - If an item is named `Hoppers`, `hopper.png` or `hoppers.png` will match.
   - If an item is named `Villager Beds`, `villager_bed.png` or `bed.png` will match.

4. **Exact Name:**
   - `Smooth Stone.png`
   - `Hopper.png`

## 📦 Fallback Behavior
If an image hasn't been uploaded yet for a particular item, the system automatically renders a sleek color-coded material indicator without displaying broken images.
