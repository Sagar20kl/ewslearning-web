import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully.",
  });

  response.cookies.set("ews_role", "", { path: "/", maxAge: 0 });
  response.cookies.set("ews_user_id", "", { path: "/", maxAge: 0 });

  return response;
}
