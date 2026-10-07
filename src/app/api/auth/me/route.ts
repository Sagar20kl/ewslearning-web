import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const userId = request.cookies.get("ews_user_id")?.value;
    const role = request.cookies.get("ews_role")?.value;

    if (!userId && !role) {
      return NextResponse.json({
        success: false,
        isAuthenticated: false,
        user: null,
      });
    }

    if (userId) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          organization: true,
          department: true,
          avatar: true,
          phone: true,
        },
      });

      if (user) {
        return NextResponse.json({
          success: true,
          isAuthenticated: true,
          data: user,
        });
      }
    }

    return NextResponse.json({
      success: false,
      isAuthenticated: false,
      user: null,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Session lookup failed." },
      { status: 500 }
    );
  }
}
