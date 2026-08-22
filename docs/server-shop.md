# TheySix Server Store & Donation Architecture 🛒

> **Status:** Draft / Planned Concept (Not Yet Public)
> **Target Route:** `https://theysix.ro-mihaiu.xyz/server/shop`

This document defines the proposed donor rank tiers, cosmetic perks, server maintenance funding goals, and Mojang EULA-compliant guidelines for the future TheySix Minecraft server store.

---

## 📜 Mojang Commercial Usage Guidelines & EULA Compliance

All store packages must adhere strictly to Mojang's Commercial Usage Guidelines:
1. **No Pay-to-Win (P2W):** Ranks and donation tiers must not grant unfair combat advantages, overpowered items, or locked gameplay mechanics.
2. **Cosmetic & Quality-of-Life Focus:** Ranks offer cosmetic titles, chat tags, particle effects, pet companions, armor trims, and priority queue during peak hours.
3. **Transparent Funding:** 100% of proceeds fund dedicated high-performance server hosting, DDoS protection, and development.

---

## 💎 Proposed Donor Ranks & Tiers

### 1. **Supporter (Tier 1)** — *$4.99 / mo or $25 Lifetime*
- **Chat Prefix:** `[Supporter]` (Cyan Glow)
- **Discord Role:** `@Supporter`
- **Cosmetics:**
  - Access to `/hat` command (place any block on your head).
  - 3 custom particle trail effects (`/particles`).
  - 1 pet companion (e.g., Mini Redstone Golem or Allay).
- **Perks:**
  - 3 additional `/sethome` locations (Total: 6).
  - Ability to write colored text on signs (`&a`, `&b`, `&e`, etc.).

### 2. **Engineer (Tier 2)** — *$9.99 / mo or $50 Lifetime*
- **Chat Prefix:** `[Engineer]` (Amber Glow)
- **Discord Role:** `@Engineer VIP`
- **Cosmetics:**
  - All Supporter cosmetics + 8 advanced particle trails.
  - Custom death messages and join/leave announcement banners.
  - Access to 3 pet companions.
  - Glow effect in lobbies (`/glow`).
- **Perks:**
  - 6 additional `/sethome` locations (Total: 10).
  - `/workbench` and `/anvil` virtual access in non-PvP zones.
  - Priority queue when the server is full (99/100 slots).

### 3. **Architect (Tier 3)** — *$19.99 / mo or $100 Lifetime*
- **Chat Prefix:** `[Architect]` (Purple Neon)
- **Discord Role:** `@Architect MVP`
- **Cosmetics:**
  - All Tier 1 & 2 perks + all 20+ particle trails and aura effects.
  - Custom Elytra particle trails (fireworks & void sparks).
  - Custom weapon & tool rename formatting (`/itemname`).
- **Perks:**
  - 12 additional `/sethome` locations (Total: 20).
  - Exclusive access to the Creative Testing Plot World for farm blueprint drafting.
  - Direct access to monthly community build councils with TheySix.

---

## 🎨 Cosmetic Bundles & Add-ons

| Item / Bundle | Type | Estimated Price | Description |
| :--- | :--- | :--- | :--- |
| **TheySix Official Cape** | OptiFine / Fabric Cosmetic | $5.00 | Custom animated TheySix insignia cape |
| **Particle Pack Vol. 1** | Chat & Movement Effect | $3.50 | Nether flames, Cherry petals, Ender dust |
| **Chat Color Palette** | Formatting Perk | $2.00 | Gradient and RGB hex chat colors |
| **Server Boost Token** | Community Multiplier | $1.99 | 1-hour 1.5x McMMO / XP boost for all online players |

---

## 🔌 Technical Implementation Plan

1. **E-Commerce Integration:** Tebex (Buycraft) or CraftingStore plugin connected to Minecraft server and Discord bot.
2. **Webhook Automation:** Instant role assignment in Discord and server command dispatch (`lp user <player> parent add <rank>`).
3. **Frontend Page (`/server/shop`):**
   - Interactive tier comparison table
   - Minecraft skin 3D viewer showing donor cape & particle preview
   - Secure checkout redirection to Tebex gateway.
