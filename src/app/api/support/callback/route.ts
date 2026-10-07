import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/support/callback - List callback requests for Admin
export async function GET() {
  try {
    const callbacks = await prisma.callbackRequest.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, count: callbacks.length, data: callbacks });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST /api/support/callback - Request instant callback from floating hub
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, topic } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: "Name and phone number are required." },
        { status: 400 }
      );
    }

    const callback = await prisma.callbackRequest.create({
      data: {
        name,
        phone,
        topic: topic || "Corporate ESG Consultation",
        status: "PENDING",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Callback request registered! Our advisory directorate will call you within 15 minutes.",
      data: callback,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to schedule callback." },
      { status: 500 }
    );
  }
}
