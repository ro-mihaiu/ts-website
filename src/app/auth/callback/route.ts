import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { canManageFarms, getDiscordUserId } from "@/lib/auth";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const origin = url.origin;
  if (!code) return NextResponse.redirect(`${origin}/login?error=missing_code`);

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return NextResponse.redirect(`${origin}/login?error=oauth_failed`);

  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !canManageFarms(user)) {
    await supabase.auth.signOut();
    return NextResponse.redirect(`${origin}/login?error=unauthorized`);
  }

  const admin = createAdminClient();
  const { error: updateError } = await admin.auth.admin.updateUserById(user.id, {
    app_metadata: { ...user.app_metadata, farm_admin: true, discord_user_id: getDiscordUserId(user) },
  });
  if (updateError) return NextResponse.redirect(`${origin}/login?error=authorization_failed`);

  await supabase.auth.refreshSession();
  return NextResponse.redirect(`${origin}/admin/farms`);
}