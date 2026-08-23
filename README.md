# TheySix Minecraft Farms Website 🎮

A modern, lightning-fast Next.js 14 website for **TheySix** to share Minecraft Java & Bedrock farm blueprints, interactive 3D schematics, world downloads, and video tutorials.

---

## 🚀 Key Features

- **🧊 3D Interactive Schematic Viewer (schemat.io style)**:
  - High-performance canvas-rendered 3D voxel engine with orbital camera rotation, pitch, pan, and zoom.
  - **Layer-by-Layer Slicing**: Slider control from Y=0 to Y=Max with "Range (1..Y)", "Single Layer", and "All Layers" modes, plus automated **Build Animation** playback.
  - **Material List (BOM)**: Searchable block count breakdown with Minecraft stack conversions (e.g. `5 stacks + 12 items`) and one-click copy to clipboard.
  - **Multi-Format Support**: Displays and downloads `.litematic`, `.schematic`, `.schem`, and `.nbt` (e.g. `111-dn.litematic`, `111-dn.schematic`, `111-dn.schem`, `111-dn.nbt`).
  - Direct download actions without link copying.
- **✨ Java & Bedrock Edition Theme & Icons**:
  - **Java Edition**: Highlighted in `#9fff99` (vibrant green) with Coffee cup icon.
  - **Bedrock Edition**: Highlighted in `#ffffff` / light grey with Bedrock Block / Cube icon.
- **🎨 Item Icons in Material List**:
  - Automatically loads `<item>.png` (or `.webp`/`.svg`) from `/public/items/` for any material in the farm's material list.
  - Supports automatic snake_case, kebab-case, singular/plural names, and fallback block color indicators.
- **👁️ View Counts**: Automatic and custom view counter displayed on the bottom-left of each farm card.
- **⚡ Auto Platform & Slug Detection**:
  - Files without `b` prefix (e.g. `111-dn.tsx`) are automatically classified as **Java Edition**.
  - Files starting with `b` (e.g. `b111-dn.tsx`) are automatically classified as **Bedrock Edition** (schematics disabled automatically).
- **🏰 Minecraft Server SMP Hub (`/server`, `/server/about`)**:
  - Community events and tournaments managed by **ro_mihaiu** at **[discord.ro-mihaiu.xyz](https://discord.ro-mihaiu.xyz)**.
  - Sub-pages for `/server/rules`, `/server/events`, and `/server/staff`.
- **🤖 TS-Bot Integration (`/bot/about`, `/bot/commands`, `/bot/tos`)**:
  - Documentation and command list for the open-source discord.js bot (`https://github.com/ro-mihaiu/ts-bot`).
- **📱 Socials & Channels (`/socials`)**:
  - Links to YouTube Java (`@TheySix`), YouTube Bedrock (`@TheySixMC`), and YouTube Minecraft Builds (`@TheySixCreations`).

---

## 📁 File & Folder Structure

All farm blueprints are located directly in `src/data/farms/`:

```
src/
├── app/                  # Next.js App Router pages
│   ├── farm/[category]/[dn]/page.tsx   # Dynamic farm detail view
│   ├── server/           # Minecraft SMP pages (about, events, rules, staff)
│   ├── bot/              # Discord bot pages (about, commands, tos)
│   └── socials/          # Social media directory
├── components/           # React UI components
│   ├── SchematicViewer3D.tsx     # 3D voxel canvas renderer
│   ├── SchematicPreviewModal.tsx # Interactive modal & Material List
│   ├── FarmCard.tsx              # Grid card with view count bottom-left
│   └── Navbar.tsx & Footer.tsx   # Navigation & footer links
├── data/
│   └── farms/            # Farm blueprint files (*-dn.tsx)
│       ├── 111-dn.tsx    # Java farm blueprint
│       ├── 112-dn.tsx    # Java farm blueprint
│       ├── b111-dn.tsx   # Bedrock farm blueprint
│       └── b112-dn.tsx   # Bedrock farm blueprint
└── types/
    └── farm.ts           # FarmData, FarmWithMetadata & FarmMaterialItem
```

---

## 🎨 How to Add Item Icons for Material Lists

Drop any item icon (`.png`, `.webp`, or `.svg`) directly into `public/items/`:

```
public/items/
├── smooth_stone.png
├── hopper.png
├── chest.png
├── water_bucket.png
├── piston.png
└── sticky_piston.png
```

The system will automatically find and display the matching icon for items in the farm checklist!

---

## 🛠️ How to Add a New Java Farm (with Schematic & Material List)

Create a new file in `src/data/farms/<dn>-dn.tsx` (e.g. `src/data/farms/118-dn.tsx`):

```tsx
import type { FarmData } from "@/types/farm";

export const farm: FarmData = {
  title: "Simple 1.21 Iron Golem Farm",
  farmType: "Iron",
  description: "Compact single-chunk iron farm producing over 350 ingots per hour.",
  worldDownloadUrl: "https://theysix.ro-mihaiu.xyz/downloads/java-118-iron-world.zip",
  schematicUrl: "https://theysix.ro-mihaiu.xyz/downloads/java-118-iron.litematic",
  youtubeUrl: "https://www.youtube.com/watch?v=VIDEO_ID",
  version: "1.21+",
  rates: "350+ Iron Ingots/hr",
  difficulty: "Easy",
  tags: ["Iron", "Villager", "Early-Game", "AFK"],
  author: "TheySix",
  date: "2026-08-20",
  featured: true,
  // Custom Material List (BOM) for the farm
  materials: [
    { name: "Smooth Stone", count: 256 },
    { name: "Water Bucket", count: 4 },
    { name: "Lava Bucket", count: 2 },
    { name: "Hopper", count: 18 },
    { name: "Chest", count: 10 },
    { name: "Villager Bed", count: 3 },
    { name: "Glass", count: 64 },
  ],
};

export default farm;
```

---

## 🛠️ How to Add a New Bedrock Farm

Create a new file in `src/data/farms/b<dn>-dn.tsx` (e.g. `src/data/farms/b114-dn.tsx`).
> ⚠️ **Note:** Bedrock Edition does not use `.litematic` schematics, so **do not include `schematicUrl`**.

```tsx
import type { FarmData } from "@/types/farm";

export const farm: FarmData = {
  title: "Bedrock 1.21 Trident Killer Mob Farm",
  farmType: "Mob / Drop",
  description: "High-yield general mob drop farm with automated piston trident killer.",
  worldDownloadUrl: "https://theysix.ro-mihaiu.xyz/downloads/bedrock-b114-mob.mcworld",
  youtubeUrl: "https://www.youtube.com/watch?v=VIDEO_ID",
  version: "1.21 Bedrock",
  rates: "2,200 Drops/hr",
  difficulty: "Medium",
  tags: ["Bedrock", "Trident Killer", "Mob Drop", "AFK"],
  author: "TheySix",
  date: "2026-08-22",
  featured: false,
};

export default farm;
```

---

## 🏆 How to Add / Manage Server Events

Server events are managed by **ro_mihaiu** and defined in `src/app/server/events/page.tsx`.

To add a new event, open `src/app/server/events/page.tsx` and add an entry to the `upcomingEvents` array:

```tsx
{
  title: "Autumn Redstone Engineering Contest",
  category: "Technical / Redstone",
  icon: Trophy, // from lucide-react
  color: "from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30",
  date: "October 10, 2026 - 18:00 UTC",
  duration: "5 Days",
  prize: "75k In-Game Coins + Discord Role",
  description: "Design the most efficient compact item sorting system. Judged on speed, hopper lock efficiency, and overflow protection.",
  status: "Upcoming",
  statusColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
}
```

Players can register for any event directly via the Events Discord: **[https://discord.ro-mihaiu.xyz](https://discord.ro-mihaiu.xyz)**.

---

## 🏃 Commands

```bash
# Start local development server (http://localhost:3000)
npm run dev

# Run ESLint validation
npm run lint

# Build production bundle
npm run build

# Start production server
npm run start
```


# ts-website
