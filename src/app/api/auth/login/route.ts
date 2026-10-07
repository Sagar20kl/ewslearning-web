import { NextRequest, NextResponse } from "next/server";
import { verifyUserCredentials } from "@/lib/auth-service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Please provide both email address and password." },
        { status: 400 }
      );
    }

    const user = await verifyUserCredentials(email, password);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials. Please verify your email and password." },
        { status: 401 }
      );
    }

    // Set secure HTTP-only cookies
    const response = NextResponse.json({
      success: true,
      message: `Welcome back, ${user.name}!`,
      data: user,
    });

    response.cookies.set("ews_role", user.role, {
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      httpOnly: false, // Accessible to client middleware / auth state
      sameSite: "lax",
    });

    response.cookies.set("ews_user_id", user.id, {
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
      httpOnly: true,
      sameSite: "lax",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Internal authentication error." },
      { status: 500 }
    );
  }
}
