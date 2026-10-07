import { NextRequest, NextResponse } from "next/server";
import { registerNewUser } from "@/lib/auth-service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, role, organization, department, phone, avatar } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Please provide both your full name and email address." },
        { status: 400 }
      );
    }

    const result = await registerNewUser({
      name,
      email,
      password: password || "admin2025",
      role: role || "STUDENT",
      organization,
      department,
      phone,
      avatar,
    });

    if (!result.success || !result.user) {
      return NextResponse.json(
        { success: false, error: result.error || "Failed to create account." },
        { status: 400 }
      );
    }

    const user = result.user;

    const response = NextResponse.json({
      success: true,
      message: `Account created successfully! Welcome to EWS Learning, ${user.name}.`,
      data: user,
    });

    // Set secure HTTP cookies
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
    console.error("API /api/auth/register error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal registration error." },
      { status: 500 }
    );
  }
}
