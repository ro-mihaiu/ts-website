import { NextResponse } from "next/server";

const STAFF_REPORT_URL = "https://discord.com/channels/985227944236568606/1444669624435212308";

export async function GET() {
  return NextResponse.redirect(STAFF_REPORT_URL);
}
