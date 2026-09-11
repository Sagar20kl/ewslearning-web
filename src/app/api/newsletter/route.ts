import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/newsletter - Subscribe to monthly sustainability dispatch
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid corporate email address." },
        { status: 400 }
      );
    }

    if (!process.env.DATABASE_URL) {
      return NextResponse.json({
        success: true,
        source: "demo_mode",
        message: "Successfully subscribed to EWS Sustainability Dispatch!",
        email,
      });
    }

    const subscriber = await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: {},
      create: { email },
    });

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to EWS Sustainability Dispatch!",
      data: subscriber,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to subscribe" },
      { status: 500 }
    );
  }
}
