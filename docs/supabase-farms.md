# Supabase farm migration

The legacy `src/data/farms/` files are intentionally still present. After verifying the Supabase catalog, they can be removed in a separate change.

## Setup

1. Run `supabase/migrations/202608240001_farms_and_storage.sql` in the Supabase SQL editor.
2. Copy `.env.example` to `.env.local` and fill in the Supabase values, the server-only service-role key, Discord OAuth values, and the two real Discord user IDs. The IDs belong in `DISCORD_MANAGER_USER_ID` and `DISCORD_THEYSIX_USER_ID`; do not use usernames.
3. In Supabase Authentication, enable Discord and set its client ID and secret. Add `http://localhost:3000/auth/callback` and the production callback URL to the allowed redirect URLs.
4. Run `npx tsx scripts/migrate-farms.ts` once the SQL and environment variables are ready. It is safe to rerun because `dn` is the upsert key.

`SUPABASE_SERVICE_ROLE_KEY` is used only by the migration script and the OAuth callback. Never expose it as a `NEXT_PUBLIC_*` variable or send it to client code.

The Discord OAuth provider must be enabled in the Supabase dashboard. The Discord Developer Portal OAuth2 redirect URI must point to the Supabase callback URL shown by Supabase for the Discord provider, while this app's redirect URI is `/auth/callback`.